'use client';

import React from 'react';
import styles from './MessageBubble.module.scss';

export type MessageBubbleVariant = 'in' | 'out';

type Props = {
	text: string;
	time: string;
	variant: MessageBubbleVariant;
};

export const MessageBubble: React.FC<Props> = ({ text, time, variant }) => {
	return (
		<div
			className={`${styles.messageRow} ${variant === 'out' ? styles.out : styles.in}`}
		>
			<div className={styles.bubble}>
				<span className={styles.text}>{text}</span>
				<span className={styles.time}>{time}</span>
			</div>
		</div>
	);
};
