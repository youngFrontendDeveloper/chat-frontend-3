'use client';

import React, { useMemo } from 'react';
import styles from './MessageBubble.module.scss';

export type MessageBubbleVariant = 'in' | 'out';

type Props = {
	text: string;
	time: string; // "12:29"
	variant: MessageBubbleVariant;
	dateTime?: string; // ISO, например "2026-01-20T12:29:00+03:00"
};

function buildTodayDateTimeFromHHmm(hhmm: string): string {
	const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
	const now = new Date();
	if (!m) {
		return now.toISOString();
	}

	const hours = Number(m[1]);
	const minutes = Number(m[2]);

	const d = new Date(now);
	d.setHours(hours, minutes, 0, 0);

	// Важно: toISOString() всегда в UTC. Для скринридеров достаточно ISO вообще.
	return d.toISOString();
}

export const MessageBubble: React.FC<Props> = ({
	text,
	time,
	variant,
	dateTime
}) => {
	const computedDateTime = useMemo(() => {
		return dateTime ?? buildTodayDateTimeFromHHmm(time);
	}, [dateTime, time]);

	return (
		<div
			className={`${styles.messageRow} ${variant === 'out' ? styles.out : styles.in}`}
		>
			<div className={styles.bubble}>
				<span className={styles.text}>{text}</span>
				<time className={styles.time} dateTime={computedDateTime}>
					{time}
				</time>
			</div>
		</div>
	);
};
