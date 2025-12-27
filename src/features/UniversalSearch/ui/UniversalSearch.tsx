// src/features/UniversalSearch/ui/UniversalSearch.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchChatsQuery } from '../api/searchApi';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SearchInput } from '@/shared/ui/SearchInput';
import styles from './UniversalSearch.module.scss';

export const UniversalSearch = () => {
	// 1. Локальное состояние для текста поиска
	const [searchTerm, setSearchTerm] = useState('');

	// 2. Задержка для debounce (300ms)
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	// 3. Роутер для навигации
	const router = useRouter();

	// 4. RTK Query запрос
	const { data, isLoading } = useSearchChatsQuery(
		{ search: debouncedSearchTerm },
		{ skip: debouncedSearchTerm.length < 2 } // Не делать запрос, если < 2 символов
	);

	// 5. Обработчик клика по чату
	const handleChatClick = (chatUid: string) => {
		router.push(`/im/${chatUid}`); // Переход на страницу чата
		setSearchTerm(''); // Очистка поля
	};

	// 6. Форматирование времени

	// 7. Получение метки типа чата
	const getChatTypeLabel = (chatType: string, isGroup: boolean): string => {
		if (isGroup) {
			return 'Группа';
		}
		if (chatType === 'channel') {
			return 'Канал';
		}
		return '';
	};

	return (
		<div className={styles.container}>
			{/* Поле ввода */}
			<SearchInput
				value={searchTerm}
				onChange={setSearchTerm}
				placeholder='Поиск чатов, групп, каналов...'
			/>

			{/* Dropdown с результатами (показываем, если >= 2 символа) */}
			{debouncedSearchTerm.length >= 2 && (
				<div className={styles.resultsDropdown}>
					{/* Состояние загрузки */}
					{isLoading && <div className={styles.status}>Загрузка...</div>}

					{/* Пустой результат */}
					{data && data.results.length === 0 && (
						<div className={styles.status}>Ничего не найдено</div>
					)}

					{/* Список результатов */}
					{data && data.results.length > 0 && (
						<ul className={styles.list}>
							{data.results.map(item => (
								<li
									key={item.id}
									className={styles.item}
									onClick={() => handleChatClick(item.chat.uid)}
								>
									{/* Аватарка */}
									<div className={styles.avatar}>
										{item.chat.avatar_url ? (
											<img
												src={item.chat.avatar_url}
												alt='avatar'
												loading='lazy'
											/>
										) : (
											<div className={styles.avatarPlaceholder}>
												{item.is_group
													? item.name[0]?.toUpperCase()
													: item.chat.first_name[0]?.toUpperCase()}
											</div>
										)}

										{/* Онлайн-индикатор (только для личных чатов) */}
										{!item.is_group && item.chat.is_online && (
											<div className={styles.onlineIndicator} />
										)}

										{/* Бейдж с количеством новых сообщений */}
										{item.new_message_count > 0 && (
											<div className={styles.badge}>
												{item.new_message_count}
											</div>
										)}
									</div>

									{/* Информация о чате */}
									<div className={styles.chatInfo}>
										<div className={styles.header}>
											<div className={styles.name}>
												{item.is_group
													? item.name
													: `${item.chat.first_name} ${item.chat.last_name}`}
											</div>

											{/* Тип чата (группа/канал) */}
											{(item.is_group || item.chat_type === 'channel') && (
												<span className={styles.chatType}>
													{getChatTypeLabel(item.chat_type, item.is_group)}
												</span>
											)}
										</div>

										{/* Последнее сообщение */}
										<div className={styles.lastMessage}>
											{item.last_seen_message ? (
												<>{item.last_seen_message.content || '📎 Вложение'}</>
											) : (
												<span className={styles.noMessages}>Нет сообщений</span>
											)}
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};
