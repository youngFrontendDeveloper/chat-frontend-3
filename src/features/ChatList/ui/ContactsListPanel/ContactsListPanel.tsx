'use client';

import React from 'react';
import styles from './ContactsListPanel.module.scss';
import { ChatListSearch } from '../ChatListSearch/ChatListSearch';

// ВАЖНО: это панель контактов. Список контактов будет отдельным компонентом позже.
// Сейчас оставляем только корректное пустое состояние как в дизайне.
export const ContactsListPanel: React.FC = () => {
	const [search, setSearch] = React.useState('');

	const isEmpty = true; // пока нет реального эндпоинта контактов

	return (
		<aside className={styles.panel}>
			<div className={styles.search}>
				<ChatListSearch
					value={search}
					onChange={setSearch}
					placeholder='Поиск'
				/>
			</div>

			{isEmpty ? (
				<div className={styles.empty}>
					<img
						className={styles.emptyImage}
						src='/images/contacts-empty.png'
						alt=''
						aria-hidden='true'
						draggable={false}
					/>
					<div className={styles.emptyText}>Список контактов пока пуст</div>
				</div>
			) : (
				<div className={styles.list}>
					{/* тут позже будет реальный список контактов */}
				</div>
			)}
		</aside>
	);
};
