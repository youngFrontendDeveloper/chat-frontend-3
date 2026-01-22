'use client';

import React, { useMemo, useCallback } from 'react';
import styles from './DialogScreen.module.scss';
import { MessageBubble } from '@/features/Dialog/ui/MessageBubble/MessageBubble';

import { Button } from '@/shared/ui/Button';
import {
	ButtonTheme,
	ButtonSize,
	ButtonColor,
	ButtonType
} from '@/shared/ui/Button/model/types/type';

type DialogScreenProps = {
	chatUid: string;
};

type Message = {
	id: string;
	direction: 'in' | 'out';
	text: string;
	time: string; // "12:29"
};

export const DialogScreen: React.FC<DialogScreenProps> = ({ chatUid }) => {
	const peer = useMemo(() => {
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
			map[chatUid] ?? { name: 'Диалог', status: 'соединение…', avatarUrl: null }
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

	// Заглушки под действия (позже подключишь реальную логику)
	const handleSearch = useCallback(() => {
		// поиск по диалогу
		// eslint-disable-next-line no-console
		console.log('search in dialog');
	}, []);

	const handleCall = useCallback(() => {
		// звонок
		// eslint-disable-next-line no-console
		console.log('call');
	}, []);

	const handleAttach = useCallback(() => {
		// прикрепить файл
		// eslint-disable-next-line no-console
		console.log('attach file');
	}, []);

	const handleEmoji = useCallback(() => {
		// открыть панель эмодзи
		// eslint-disable-next-line no-console
		console.log('open emoji');
	}, []);

	const handleVoice = useCallback(() => {
		// голосовое сообщение
		// eslint-disable-next-line no-console
		console.log('voice message');
	}, []);

	return (
		<div
			className={styles.dialog}
			role='region'
			aria-label={`Диалог с ${peer.name}`}
		>
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
					<Button
						theme={ButtonTheme.CIRCLE}
						size={ButtonSize.S}
						color={ButtonColor.TRANSPARENT}
						btnType={ButtonType.BUTTON}
						ariaLabel='Поиск в диалоге'
						onClick={handleSearch}
					>
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
					</Button>

					<Button
						theme={ButtonTheme.CIRCLE}
						size={ButtonSize.S}
						color={ButtonColor.TRANSPARENT}
						btnType={ButtonType.BUTTON}
						ariaLabel='Позвонить'
						onClick={handleCall}
					>
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M7 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
						</svg>
					</Button>
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
				<Button
					theme={ButtonTheme.CIRCLE}
					size={ButtonSize.S}
					color={ButtonColor.TRANSPARENT}
					btnType={ButtonType.BUTTON}
					ariaLabel='Прикрепить файл'
					onClick={handleAttach}
				>
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M21 10.5 12.2 19.3a5 5 0 0 1-7.1-7.1L14.5 2.8a3.5 3.5 0 0 1 5 5l-9.2 9.2a2 2 0 1 1-2.8-2.8l8.5-8.5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</Button>

				<div className={styles.inputWrap}>
					<input
						className={styles.input}
						placeholder='Сообщение'
						type='text'
						autoFocus
					/>

					<Button
						className={styles.emojiBtn}
						theme={ButtonTheme.CIRCLE}
						size={ButtonSize.S}
						color={ButtonColor.TRANSPARENT}
						btnType={ButtonType.BUTTON}
						ariaLabel='Эмодзи'
						onClick={handleEmoji}
					>
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
					</Button>
				</div>

				<Button
					theme={ButtonTheme.CIRCLE}
					size={ButtonSize.S}
					color={ButtonColor.TRANSPARENT}
					btnType={ButtonType.BUTTON}
					ariaLabel='Голосовое сообщение'
					onClick={handleVoice}
				>
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
				</Button>
			</div>
		</div>
	);
};
