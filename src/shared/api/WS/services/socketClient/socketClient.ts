import type { WSRequest, WSResponse } from '@/shared/api/WS/types/wsTypes';

let isConnecting = false;
let connectPromise: Promise<WebSocket> | null = null;

let socket: WebSocket | null = null;
const subscribers = new Map<string, Set<(data: WSResponse) => void>>();
const pendingRequests = new Map<string, (response: WSResponse) => void>();

let currentToken: string | null = null;
let tokenExpiry = 0; // 9 мин TTL

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 1000;

// получение токена
const getAccessToken = async (): Promise<string | null> => {
	try {
		const res = await fetch('/api/auth/getAccessToken', {
			method: 'GET',
			cache: 'no-store'
		});
		if (!res.ok) {
			return null;
		}
		const data = await res.json();
		return data.accessToken ?? null;
	} catch {
		return null;
	}
};

// Обновление токена (вызывается перед созданием сокета)
const ensureFreshToken = async (): Promise<string> => {
	if (currentToken && Date.now() < tokenExpiry) {
		return currentToken;
	}

	const token = await getAccessToken();
	if (!token) {
		throw new Error('No token');
	}

	currentToken = token;
	tokenExpiry = Date.now() + 9 * 60 * 1000; // 9 минут
	return token;
};

// Создание/пересоздание WebSocket
const setupSocket = async (): Promise<WebSocket> => {
	const token = await ensureFreshToken();

	if (socket && socket.readyState === WebSocket.OPEN) {
		return socket;
	}

	// Mutex: если уже подключаемся — ждём
	if (isConnecting) {
		return await connectPromise!;
	}

	if (socket && socket.readyState === WebSocket.CONNECTING) {
		socket.close();
	}

	// Создаём новый промис с блокировкой
	connectPromise = new Promise((resolve, reject) => {
		isConnecting = true;

		const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?authorization=${encodeURIComponent(token)}`;
		socket = new WebSocket(wsUrl);

		socket.onopen = () => {
			// Глобальный onmessage (только один раз!)
			socket!.onmessage = event => {
				try {
					const response: WSResponse = JSON.parse(event.data);

					const pendingCb = pendingRequests.get(response.request_uid);
					if (pendingCb) {
						pendingCb(response);
						pendingRequests.delete(response.request_uid);
						return;
					}

					subscribers.get(response.action)?.forEach(cb => cb(response));
				} catch (_) {
					throw new Error('WS Error');
				}
			};

			isConnecting = false;
			connectPromise = null;
			resolve(socket!);
		};

		socket.onerror = () => {
			isConnecting = false;
			connectPromise = null;
			socket = null;
			reject(new Error('WS connection failed'));

			if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
				reconnectAttempts++;
				setTimeout(() => {
					setupSocket();
				}, RECONNECT_DELAY * reconnectAttempts);
			}
		};

		socket.onclose = e => {
			if (socket && socket.readyState !== WebSocket.OPEN) {
				socket = null;
			}

			// Отменяем все ожидающие запросы
			pendingRequests.forEach((reject, uid) => {
				reject({
					request_uid: uid,
					action: 'error',
					status: 'error'
				});
			});
			pendingRequests.clear();

			// Очищаем подписки
			subscribers.clear();

			isConnecting = false;
			connectPromise = null;

			if (e.code !== 1000) {
				reject(new Error(`WS closed: ${e.code}`));
			}
		};
	});

	return connectPromise;
};

// Подписка по action
export const subscribeWS = <T = WSResponse>(
	action: string,
	callback: (data: T) => void
): (() => void) => {
	if (!subscribers.has(action)) {
		subscribers.set(action, new Set());
	}
	subscribers.get(action)!.add(callback as (data: WSResponse) => void);

	return () => {
		subscribers.get(action)?.delete(callback as (data: WSResponse) => void);
		if (subscribers.get(action)?.size === 0) {
			subscribers.delete(action);
		}
	};
};

// Отправка запроса с ожиданием ответа по request_uid
export const sendWS = async <T = WSResponse>(
	request: WSRequest
): Promise<T | undefined> => {
	try {
		const ws = await setupSocket();

		if (!ws || ws.readyState !== WebSocket.OPEN) {
			throw new Error('WS not connected');
		}

		return new Promise((resolve, reject) => {
			const requestUid = request.request_uid ?? crypto.randomUUID();
			// const requestUid = crypto.randomUUID();

			// для иммутабельности
			const requestWithUid = {
				...request,
				request_uid: requestUid
			};

			pendingRequests.set(requestUid, resolve as (res: WSResponse) => void);

			ws.send(JSON.stringify(requestWithUid));

			// Таймаут ответа
			const timeoutId = setTimeout(() => {
				if (pendingRequests.has(requestUid)) {
					pendingRequests.delete(requestUid);
					reject(new Error(`Timeout: ${request.action}`));
				}
			}, 10000);

			// На случай, если resolve вызовут до таймаута
			const originalResolve = pendingRequests.get(requestUid);
			if (originalResolve) {
				pendingRequests.set(requestUid, (res: WSResponse) => {
					clearTimeout(timeoutId);
					originalResolve(res);
				});
			}
		});
	} catch (error) {
		throw error;
	}
};

// Отключение и cleanup
export const disconnectWS = () => {
	socket?.close();
	socket = null;
	currentToken = null;
	subscribers.clear();
	pendingRequests.clear();
};

// Helpers для ваших actions (TEST)
export const connectChat = () =>
	sendWS({
		action: '_connect'
	});

// export const createTextMessageForUser = (
// 	userUid: string,
// 	content: string,
// 	files: {
// 		filename: string;
// 		data: string;
// 	}[] = []
// ) =>
// 	sendWS({
// 		action: 'create_text_message',
// 		object: { to_user_uid: userUid, content, files }
// 	});

export const createTextMessageForChat = (chatKey: string, content: string) =>
	sendWS({
		action: 'create_text_message',
		object: { chat_key: chatKey, content }
	});

export const addMembersToChat = (chatKey: string, uids: string[]) =>
	sendWS({
		action: 'add_members_to_chat',
		object: { chat_key: chatKey, uid_users_list: uids }
	});
