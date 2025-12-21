'use client';
import React, { useState } from 'react';
import { useSearchUsersQuery } from '@/features/SearchUsers/api/searchUsersApi';

export const SearchUsers = () => {
	const [searchTerm, setSearchTerm] = useState('');

	// Вызываем хук.
	const {
		data: users,
		isLoading,
		error
	} = useSearchUsersQuery(searchTerm, {
		skip: !searchTerm
	});

	return (
		<div>
			<input
				type='text'
				placeholder='Найти пользователя...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>

			{/* Показываем состояние загрузки */}
			{isLoading && <div>Загрузка...</div>}

			{/* Показываем ошибку, если она есть */}
			{error && <div>Произошла ошибка при поиске</div>}

			{/* Отображаем найденных пользователей */}
			{users && (
				<ul>
					{users.map(user => (
						<li key={user.id}>
							{user.username} ({user.firstName} {user.lastName})
						</li>
					))}
				</ul>
			)}

			{/* Если нет результатов */}
			{searchTerm && users && users.length === 0 && (
				<div>Пользователи не найдены</div>
			)}
		</div>
	);
};
