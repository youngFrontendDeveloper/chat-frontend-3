'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllChatsQuery } from '@/features/ChatList/api/chatListApi';
import styles from './ChatList.module.scss';

export function ChatList() {
	const router = useRouter();
	const { data, isLoading, isError } = useGetAllChatsQuery();

	const [searchQuery, setSearchQuery] = useState('');

	const allContacts = data?.results ?? [];

	const filteredContacts = (() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) {
			return allContacts;
		}

		return allContacts.filter(chat => {
			const chatName = (chat.name ?? '').toLowerCase();
			if (chatName.includes(q)) {
				return true;
			}

			const username = (chat.chat?.username ?? '').toLowerCase();
			if (!chat.is_group && username.includes(q)) {
				return true;
			}

			if (!chat.is_group) {
				const fullName =
					`${chat.chat?.first_name ?? ''} ${chat.chat?.last_name ?? ''}`.toLowerCase();
				if (fullName.includes(q)) {
					return true;
				}
			}

			const lastMsg = (chat.last_seen_message?.content ?? '').toLowerCase();
			if (lastMsg.includes(q)) {
				return true;
			}

			return false;
		});
	})();

	const handleChatClick = (chatUid: string) => {
		router.push(`/im/${chatUid}`);
	};

	if (isLoading) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.loading}>Загрузка контактов...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.error}>Ошибка загрузки контактов</div>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.searchContainer}>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск контактов'
					className={styles.searchInput}
				/>
			</div>

			<div className={styles.statsBar}>
				{searchQuery ? (
					<span>
						Найдено: {filteredContacts.length} из {allContacts.length}
					</span>
				) : (
					<span>Всего чатов: {allContacts.length}</span>
				)}
			</div>

			<div className={styles.container}>
				{filteredContacts.length > 0 ? (
					filteredContacts.map(chat => (
						<div
							key={chat.id}
							className={styles.chatItem}
							onClick={() => handleChatClick(chat.chat.uid)}
						>
							<div className={styles.avatarWrapper}>
								{chat.chat.avatar_url ? (
									<img src={chat.chat.avatar_url} alt={chat.name} />
								) : (
									<div className={styles.avatarPlaceholder}>
										{(chat.name?.[0] ?? '?').toUpperCase()}
									</div>
								)}

								{!chat.is_group && chat.chat.is_online && (
									<div className={styles.onlineIndicator} />
								)}
							</div>

							<div className={styles.chatContent}>
								<div className={styles.chatHeader}>
									<span className={styles.chatName}>{chat.name}</span>

									{chat.new_message_count > 0 && (
										<span className={styles.unreadBadge}>
											{chat.new_message_count}
										</span>
									)}
								</div>

								<div className={styles.lastMessage}>
									{chat.last_seen_message
										? chat.last_seen_message.content
										: 'Нет сообщений'}
								</div>
							</div>
						</div>
					))
				) : (
					<div className={styles.emptyState}>
						{searchQuery ? (
							<>
								<p>Ничего не найдено по запросу:</p>
								<strong>&quot;{searchQuery}&quot;</strong>
							</>
						) : (
							<p>У вас пока нет чатов</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ChatList;
