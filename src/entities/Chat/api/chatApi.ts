import { rtkApi } from '@/shared/api/rtkApi';
import type {
	Chat,
	ChatListResponse,
	GetChatsRequest
} from '../model/types/chat.types';

export const chatApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getChats: build.query<ChatListResponse, GetChatsRequest | void>({
			query: query => {
				const params: Record<string, string | number | boolean | undefined> = {
					page_size: query?.pageSize ?? 100,
					ordering: query?.ordering ?? '-last_activity_at',
					page: query?.page,
					search: query?.search?.trim() || undefined,
					is_active: query?.isActive,
					is_blocked: query?.isBlocked,
					is_favorite: query?.isFavorite
				};

				// Удаляем undefined параметры
				Object.keys(params).forEach(key => {
					if (params[key] === undefined) {
						delete params[key];
					}
				});

				return {
					url: '/chat/list/',
					params,
					method: 'GET'
				};
			},
			providesTags: result =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: 'Chats' as const,
								id
							})),
							{ type: 'Chats', id: 'LIST' }
						]
					: [{ type: 'Chats', id: 'LIST' }],
			keepUnusedDataFor: 60
		}),
		getChatById: build.query<Chat, string>({
			query: chatUid => ({
				url: `/chat/${chatUid}/`,
				method: 'GET'
			}),
			providesTags: (result, error, chatUid) => [{ type: 'Chats', id: chatUid }]
		})
	})
});

export const {
	useGetChatsQuery,
	useGetChatByIdQuery,
	useLazyGetChatsQuery,
	endpoints: { getChats }
} = chatApi;
