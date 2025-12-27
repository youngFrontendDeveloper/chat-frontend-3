'use client';

import React from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export const SearchInput = ({
	value,
	onChange,
	placeholder = 'Поиск...',
	className = ''
}: SearchInputProps) => {
	const handleClear = () => {
		onChange('');
	};

	return (
		<div className={`${styles.container} ${className}`}>
			{/* Иконка поиска */}
			<svg
				className={styles.searchIcon}
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M19 19L14.65 14.65'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>

			{/* Поле ввода */}
			<input
				type='text'
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				className={styles.input}
			/>

			{/* Кнопка очистки (показывается только если есть текст) */}
			{value && (
				<button
					type='button'
					onClick={handleClear}
					className={styles.clearButton}
					aria-label='Очистить'
				>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M12 4L4 12M4 4L12 12'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			)}
		</div>
	);
};
