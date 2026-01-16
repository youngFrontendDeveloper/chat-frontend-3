'use client';

import React, { useMemo } from 'react';
import styles from './DialogScreen.module.scss';
import { MessageBubble } from '@/features/Dialog/ui/MessageBubble/MessageBubble';

type DialogScreenProps = {
	chatUid: string;
	// Если позже подтянешь реальный чат-объект — можно прокинуть сюда name/avatar/status
};

type Message = {
	id: string;
	direction: 'in' | 'out';
	text: string;
	time: string; // "12:29"
};

export const DialogScreen: React.FC<DialogScreenProps> = ({ chatUid }) => {
	// Временно мок. Потом заменишь на запрос по chatUid.
	const peer = useMemo(() => {
		// Мини-табличка для демо: chatUid -> имя
		const map: Record<
			string,
			{ name: string; status: string; avatarUrl?: string | null }
		> = {
			'u-oleg': {
				name: 'Руслан Ермаков',
				status: 'соединение…',
				avatarUrl: null
			},
			'u-anna': { name: 'Анна К.', status: 'соединение…', avatarUrl: null }
		};

		return (
			map[chatUid] ?? { name: `Диалог`, status: 'соединение…', avatarUrl: null }
		);
	}, [chatUid]);

	const messages: Message[] = useMemo(
		() => [
			{
				id: 'm1',
				direction: 'in',
				text: 'Да я вот тоже никак не могу поправиться, уже 2 недели болею, отлёживаюсь.',
				time: '12:29'
			},
			{ id: 'm2', direction: 'out', text: 'Вот такие вот дела', time: '12:49' },
			{
				id: 'm3',
				direction: 'out',
				text: 'Договорились на завтра',
				time: '21:46'
			},
			{ id: 'm4', direction: 'in', text: 'Ну что?', time: '11:49' }
		],
		[]
	);

	return (
		<div className={styles.dialog}>
			<div className={styles.topBar}>
				<div className={styles.peer}>
					<div className={styles.peerAvatar}>
						{peer.avatarUrl ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								className={styles.peerAvatarImg}
								src={peer.avatarUrl}
								alt={peer.name}
							/>
						) : (
							<div className={styles.peerAvatarFallback}>
								{(peer.name?.[0] ?? '?').toUpperCase()}
							</div>
						)}
					</div>

					<div className={styles.peerMeta}>
						<div className={styles.peerName}>{peer.name}</div>
						<div className={styles.peerStatus}>{peer.status}</div>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						type='button'
						className={styles.iconBtn}
						aria-label='Поиск в диалоге'
					>
						{/* search icon (inline svg чтобы не зависеть от путей) */}
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z'
								stroke='currentColor'
								strokeWidth='2'
							/>
							<path
								d='M16.5 16.5 21 21'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>

					<button
						type='button'
						className={styles.iconBtn}
						aria-label='Позвонить'
					>
						{/* phone icon */}
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M7 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className={styles.messages}>
				{messages.map(m => (
					<MessageBubble
						key={m.id}
						text={m.text}
						time={m.time}
						variant={m.direction}
					/>
				))}
			</div>

			<div className={styles.footer}>
				<button
					type='button'
					className={styles.footerIconBtn}
					aria-label='Прикрепить файл'
				>
					{/* paperclip */}
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M21 10.5 12.2 19.3a5 5 0 0 1-7.1-7.1L14.5 2.8a3.5 3.5 0 0 1 5 5l-9.2 9.2a2 2 0 1 1-2.8-2.8l8.5-8.5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>

				<div className={styles.inputWrap}>
					<input className={styles.input} placeholder='Сообщение' type='text' />

					<button type='button' className={styles.emojiBtn} aria-label='Эмодзи'>
						{/* smile */}
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z'
								stroke='currentColor'
								strokeWidth='2'
							/>
							<path
								d='M8 14s1.5 2 4 2 4-2 4-2'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M9 10h.01M15 10h.01'
								stroke='currentColor'
								strokeWidth='3'
								strokeLinecap='round'
							/>
						</svg>
					</button>
				</div>

				<button
					type='button'
					className={styles.footerIconBtn}
					aria-label='Голосовое сообщение'
				>
					{/* mic */}
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z'
							stroke='currentColor'
							strokeWidth='2'
						/>
						<path
							d='M19 11a7 7 0 0 1-14 0'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
						/>
						<path
							d='M12 18v3'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
