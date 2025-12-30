'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllChatsQuery } from '@/features/ChatList/api/chatListApi';
import styles from './ChatList.module.scss';

export const ChatList = () => {
	const router = useRouter();

	// 1. Получаем ВСЕ контакты с бэкенда
	const { data, isLoading, isError } = useGetAllChatsQuery();

	// 2. Поисковый запрос
	const [searchQuery, setSearchQuery] = useState('');

	// 3. allContacts - все контакты с бэка
	const allContacts = data?.results || [];

	// 4. Функция фильтрации
	const filterContacts = () => {
		// Если поиск пустой → возвращаем все контакты
		if (!searchQuery.trim()) {
			return allContacts;
		}

		// Фильтруем по поисковому запросу
		const query = searchQuery.toLowerCase();

		return allContacts.filter(chat => {
			// Поиск по имени чата
			if (chat.name.toLowerCase().includes(query)) {
				return true;
			}

			// Поиск по username (для личных чатов)
			if (!chat.is_group && chat.chat.username?.toLowerCase().includes(query)) {
				return true;
			}

			// Поиск по имени и фамилии (для личных чатов)
			if (!chat.is_group) {
				const fullName =
					`${chat.chat.first_name} ${chat.chat.last_name}`.toLowerCase();
				if (fullName.includes(query)) {
					return true;
				}
			}

			// Поиск по содержимому последнего сообщения
			if (chat.last_seen_message?.content.toLowerCase().includes(query)) {
				return true;
			}

			return false;
		});
	};

	// 5. filteredContacts - отфильтрованные контакты
	const filteredContacts = filterContacts();

	// Обработчик клика по чату
	const handleChatClick = (chatUid: string) => {
		router.push(`/im/${chatUid}`);
	};

	// Состояние загрузки
	if (isLoading) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.loading}>Загрузка контактов...</div>
			</div>
		);
	}

	// Состояние ошибки
	if (isError) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.error}>Ошибка загрузки контактов</div>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			{/* Поле поиска */}
			<div className={styles.searchContainer}>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск контактов'
					className={styles.searchInput}
				/>
			</div>

			{/* Счётчик результатов */}
			<div className={styles.statsBar}>
				{searchQuery ? (
					<span>
						Найдено: {filteredContacts.length} из {allContacts.length}
					</span>
				) : (
					<span>Всего чатов: {allContacts.length}</span>
				)}
			</div>

			{/* Список чатов */}
			<div className={styles.container}>
				{filteredContacts.length > 0 ? (
					filteredContacts.map(chat => (
						<div
							key={chat.id}
							className={styles.chatItem}
							onClick={() => handleChatClick(chat.chat.uid)}
						>
							{/* Аватарка */}
							<div className={styles.avatarWrapper}>
								{chat.chat.avatar_url ? (
									<img src={chat.chat.avatar_url} alt={chat.name} />
								) : (
									<div className={styles.avatarPlaceholder}>
										{chat.name[0]?.toUpperCase()}
									</div>
								)}

								{/* Онлайн-индикатор (только для личных чатов) */}
								{!chat.is_group && chat.chat.is_online && (
									<div className={styles.onlineIndicator} />
								)}
							</div>

							{/* Контент чата */}
							<div className={styles.chatContent}>
								<div className={styles.chatHeader}>
									<span className={styles.chatName}>{chat.name}</span>

									{/* Счётчик непрочитанных */}
									{chat.new_message_count > 0 && (
										<span className={styles.unreadBadge}>
											{chat.new_message_count}
										</span>
									)}
								</div>

								{/* Последнее сообщение */}
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
};
