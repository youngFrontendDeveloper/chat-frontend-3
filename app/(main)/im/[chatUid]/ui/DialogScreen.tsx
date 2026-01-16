'use client';

import React, { useMemo, useState } from 'react';
import { useGetAllChatsQuery } from '@/features/ChatList/api/chatListApi';
import type { ChatItem } from '@/features/ChatList/model/types';
import styles from './DialogScreen.module.scss';

type Props = {
	chatUid: string;
};

export default function DialogScreen({ chatUid }: Props) {
	const { data, isLoading, isError } = useGetAllChatsQuery();
	const [message, setMessage] = useState('');

	const chat = useMemo(() => {
		const list = data?.results ?? [];
		return list.find((c: ChatItem) => c.chat.uid === chatUid) ?? null;
	}, [data, chatUid]);

	if (isLoading) {
		return <div className={styles.state}>Загрузка диалога…</div>;
	}

	if (isError) {
		return <div className={styles.stateError}>Ошибка загрузки диалога</div>;
	}

	if (!chat) {
		return (
			<div className={styles.notFound}>
				<div className={styles.notFoundTitle}>Чат не найден</div>
				<div className={styles.notFoundSub}>
					Проверь, что в моках есть chat.chat.uid равный: <b>{chatUid}</b>
				</div>
			</div>
		);
	}

	const title = chat.name;
	const status =
		!chat.is_group && chat.chat.is_online
			? 'в сети'
			: !chat.is_group
				? 'не в сети'
				: '';

	return (
		<div className={styles.dialog}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<div className={styles.headerAvatar}>
						{chat.chat.avatar_url ? (
							<img
								className={styles.headerAvatarImg}
								src={chat.chat.avatar_url}
								alt={title}
							/>
						) : (
							<div className={styles.headerAvatarFallback}>
								{(title?.[0] ?? '?').toUpperCase()}
							</div>
						)}
					</div>
					<div className={styles.headerInfo}>
						<div className={styles.headerTitle}>{title}</div>
						{status ? (
							<div className={styles.headerStatus}>{status}</div>
						) : null}
					</div>
				</div>

				<div className={styles.headerRight}>
					<button className={styles.iconBtn} type='button' aria-label='Поиск'>
						🔍
					</button>
					<button className={styles.iconBtn} type='button' aria-label='Звонок'>
						📞
					</button>
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.empty}>
					<div className={styles.emptyTitle}>Сообщений пока нет</div>
					<div className={styles.emptySub}>Напишите первым</div>
				</div>
			</div>

			<div className={styles.footer}>
				<button
					className={styles.attachBtn}
					type='button'
					aria-label='Вложение'
				>
					📎
				</button>
				<input
					className={styles.input}
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder='Сообщение'
					type='text'
				/>
				<button className={styles.micBtn} type='button' aria-label='Голос'>
					🎤
				</button>
			</div>
		</div>
	);
}
