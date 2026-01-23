'use client';

import React, { useMemo } from 'react';
import { useGetAllChatsQuery } from '@/features/ChatList/api/chatListApi';
import type { ChatItem } from '@/features/ChatList/model/types';

import { UserCard } from '@/shared/ui/UserCard/ui/UserCard';
import type { IUserCard } from '@/shared/ui/UserCard/model/types/IUserCard';
import { UserCardType } from '@/shared/ui/UserCard/model/types/IUserCard';

import styles from './ChatList.module.scss';

type Props = {
	searchQuery: string;
	activeChatUid: string | null;
	onSelectChat: (uid: string) => void;
};

const EMPTY_CHATS: ChatItem[] = [];

const EMPTY_LAST_MESSAGE: NonNullable<ChatItem['last_seen_message']> = {
	id: 0,
	uid: '',
	from_user: '',
	content: 'Нет сообщений',
	files_summary: { types: [], count: 0 },
	has_replied_message: false,
	has_forwarded_message: false,
	new: false,
	created_at: 0,
	updated_at: 0
};

const CHAT_TYPE_MAP: Record<ChatItem['chat_type'], IUserCard['chat_type']> = {
	chat: 'chat' as IUserCard['chat_type'],
	group: 'public-group' as IUserCard['chat_type'],
	channel: 'public-channel' as IUserCard['chat_type']
};

const buildUserCardData = (chat: ChatItem): IUserCard => {
	const isGroup = chat.is_group;

	const firstName = isGroup ? chat.name : (chat.chat.first_name ?? '');
	const lastName = isGroup ? '' : (chat.chat.last_name ?? '');

	const nickname = chat.chat.username ? `@${chat.chat.username}` : undefined;

	const lastMessage =
		chat.last_seen_message !== null
			? {
					...chat.last_seen_message,
					new: chat.new_message_count > 0 || chat.last_seen_message.new
				}
			: EMPTY_LAST_MESSAGE;

	return {
		user: {
			uid: chat.chat.uid,
			username: chat.chat.username,
			nickname,
			first_name: firstName,
			last_name: lastName,
			avatar_url: chat.chat.avatar_url ?? undefined,
			avatar_webp_url: chat.chat.avatar_webp_url ?? undefined,
			is_online: !isGroup ? chat.chat.is_online : false,
			was_online_at: chat.chat.was_online_at
		},
		notifications: chat.notification,
		new_message_count: chat.new_message_count,
		chat_type: CHAT_TYPE_MAP[chat.chat_type],
		chat_key: chat.chat.uid,
		last_message: lastMessage
	};
};

export const ChatList: React.FC<Props> = ({
	searchQuery,
	activeChatUid,
	onSelectChat
}) => {
	const { data, isLoading, isError } = useGetAllChatsQuery();

	// важно: чтобы ссылка в deps useMemo была стабильной и eslint не ругался
	const allChats = data?.results ?? EMPTY_CHATS;

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
						<UserCard
							userData={buildUserCardData(chat)}
							type={UserCardType.CHAT}
						/>
					</button>
				);
			})}
		</div>
	);
};
