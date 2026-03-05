'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
	FontWeight,
	Text,
	TextAlign,
	TextColor,
	TextSize,
	TextTag,
	TextType,
	TitleTag
} from '@/shared/ui/Text';
import { Success } from '@icons/index';
import styles from './SuccessBlock.module.scss';

export const REDIRECT_DELAYS = [3000, 5000, 10000] as const;
export type RedirectDelay = (typeof REDIRECT_DELAYS)[number];

export interface SuccessBlockProps {
	marginTop?: string;
	title: string;
	text?: string;
	redirectUrl?: string;
	redirectDelay?: RedirectDelay;
}

export function SuccessBlock({
	marginTop,
	title,
	text,
	redirectUrl,
	redirectDelay = 3000
}: SuccessBlockProps) {
	const [countdown, setCountdown] = useState(Math.ceil(redirectDelay / 1000));
	const router = useRouter();
	const redirectUrlRef = useRef(redirectUrl);

	useEffect(() => {
		redirectUrlRef.current = redirectUrl;
	}, [redirectUrl]);

	useEffect(() => {
		if (!redirectUrl || countdown <= 0) {
			return;
		}

		const interval = setInterval(() => {
			setCountdown(prev => (prev <= 1 ? 0 : prev - 1));
		}, 1000);

		return () => clearInterval(interval);
	}, [redirectUrl, countdown]);

	useEffect(() => {
		if (redirectUrl && countdown <= 0) {
			router.push(redirectUrl);
		}
	}, [redirectUrl, countdown, router]);

	useEffect(() => {
		setCountdown(Math.ceil(redirectDelay / 1000));
	}, [redirectDelay]);

	return (
		<div
			className={styles.successBlock}
			style={{ marginTop }}
			role='status'
			aria-live='polite'
			aria-atomic='true'
		>
			<Success width={66.7} height={66.7} className={styles.successIcon} />

			<Text
				type={TextType.TITLE}
				tag={TitleTag.H2}
				fontSize={TextSize.XL}
				fontWeight={FontWeight.MEDIUM}
				textAlign={TextAlign.CENTER}
				className={styles.successTitle}
			>
				{title}
			</Text>

			{text && (
				<Text
					type={TextType.TEXT}
					tag={TextTag.P}
					fontSize={TextSize.L}
					fontWeight={FontWeight.REGULAR}
					textAlign={TextAlign.CENTER}
					color={TextColor.BLACK}
					className={styles.successText}
				>
					{text}{' '}
					{countdown > 0 && (
						<span
							className={styles.countdown}
							aria-live='polite'
							aria-atomic='true'
						>
							({countdown}с)
						</span>
					)}
				</Text>
			)}
		</div>
	);
}
