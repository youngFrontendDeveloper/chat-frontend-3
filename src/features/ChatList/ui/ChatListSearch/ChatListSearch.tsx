'use client';

import React from 'react';
import styles from './ChatListSearch.module.scss';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export const ChatListSearch = ({
	value,
	onChange,
	placeholder = 'Поиск'
}: Props) => {
	return (
		<div className={styles.root}>
			<div className={styles.field}>
				<img
					className={styles.icon}
					src='/images/Search.svg'
					alt='search'
					width={16}
					height={16}
					draggable={false}
				/>
				<input
					className={styles.input}
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					type='text'
				/>
			</div>
		</div>
	);
};
