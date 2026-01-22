'use client';

import React, { useCallback } from 'react';
import styles from './ChatListSearch.module.scss';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export const ChatListSearch: React.FC<Props> = ({
	value,
	onChange,
	placeholder = 'Поиск'
}) => {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Escape') {
				onChange('');
				e.currentTarget.blur();
				return;
			}

			if (e.key === 'Enter') {
				e.currentTarget.blur();
			}
		},
		[onChange]
	);

	return (
		<div className={styles.root}>
			<div className={styles.field}>
				<img
					className={styles.icon}
					src='/images/Search.svg'
					alt=''
					aria-hidden='true'
					width={16}
					height={16}
					draggable={false}
				/>

				<input
					className={styles.input}
					value={value}
					onChange={e => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					aria-label={placeholder}
					type='search'
					autoComplete='off'
					spellCheck={false}
				/>
			</div>
		</div>
	);
};
