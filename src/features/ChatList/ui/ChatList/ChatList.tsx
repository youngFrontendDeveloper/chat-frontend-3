'use client';

import React, { useMemo } from 'react';
import { useGetAllChatsQuery } from '@/features/ChatList/api/chatListApi';
import type { ChatItem } from '@/features/ChatList/model/types';
import styles from './ChatList.module.scss';

type Props = {
	searchQuery: string;
	activeChatUid: string | null;
	onSelectChat: (uid: string) => void;
};

export const ChatList: React.FC<Props> = ({
	searchQuery,
	activeChatUid,
	onSelectChat
}) => {
	const { data, isLoading, isError } = useGetAllChatsQuery();
	const allChats = data?.results ?? [];

	const filtered = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) {
			return allChats;
		}

		return allChats.filter(chat => {
			const name = (chat.name ?? '').toLowerCase();
			if (name.includes(q)) {
				return true;
			}

			const username = (chat.chat?.username ?? '').toLowerCase();
			if (!chat.is_group && username.includes(q)) {
				return true;
			}

			const fullName =
				`${chat.chat?.first_name ?? ''} ${chat.chat?.last_name ?? ''}`
					.trim()
					.toLowerCase();
			if (!chat.is_group && fullName.includes(q)) {
				return true;
			}

			const lastText = (chat.last_seen_message?.content ?? '').toLowerCase();
			if (lastText.includes(q)) {
				return true;
			}

			return false;
		});
	}, [allChats, searchQuery]);

	if (isLoading) {
		return <div className={styles.state}>Загрузка…</div>;
	}
	if (isError) {
		return <div className={styles.stateError}>Ошибка загрузки контактов</div>;
	}
	if (!filtered.length) {
		return <div className={styles.state}>Ничего не найдено</div>;
	}

	return (
		<div className={styles.wrapper}>
			{filtered.map((chat: ChatItem) => {
				const uid = chat.chat.uid;
				const isActive = activeChatUid === uid;

				return (
					<button
						key={chat.id}
						type='button'
						onClick={() => onSelectChat(uid)}
						className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
					>
						<div className={styles.avatar}>
							{chat.chat.avatar_url ? (
								<img
									className={styles.avatarImg}
									src={chat.chat.avatar_url}
									alt={chat.name}
								/>
							) : (
								<div className={styles.avatarFallback}>
									{(chat.name?.[0] ?? '?').toUpperCase()}
								</div>
							)}
							{!chat.is_group && chat.chat.is_online ? (
								<span className={styles.online} />
							) : null}
						</div>

						<div className={styles.content}>
							<div className={styles.top}>
								<div className={styles.title}>{chat.name}</div>
								{chat.new_message_count > 0 ? (
									<div className={styles.badge}>{chat.new_message_count}</div>
								) : null}
							</div>

							<div className={styles.sub}>
								{chat.last_seen_message?.content
									? chat.last_seen_message.content
									: 'Нет сообщений'}
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
};
