'use client';

import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatListSearchQuery, setChatListSearchQuery } from '../../model';
import styles from './ChatListSearch.module.scss';

export const ChatListSearch = () => {
	const dispatch = useDispatch();
	const value = useSelector(selectChatListSearchQuery);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(setChatListSearchQuery(e.target.value));
		},
		[dispatch]
	);

	return (
		<div className={styles.searchContainer}>
			<input
				type='text'
				value={value}
				onChange={onChange}
				placeholder='Поиск контактов'
				className={styles.searchInput}
			/>
		</div>
	);
};
