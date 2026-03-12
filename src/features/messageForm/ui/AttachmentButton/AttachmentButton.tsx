'use client';

import { Button, ButtonColor } from '@/shared/ui/Button';
import { Paperclip } from '@icons/index';
import { useState } from 'react';
import { VoiceFile } from '../../model/types/types';
import styles from './AttachmentButton.module.scss';

interface AttachmentButtonProps {
	setFiles: (file: VoiceFile[]) => void;
}

export function AttachmentButton({ setFiles }: AttachmentButtonProps) {
	const [showPopup, setShowPopup] = useState(false);

	return (
		<Button
			color={ButtonColor.TRANSPARENT}
			className={styles.button}
			aria-label='Выбрать файл'
			onClick={() => {}}
		>
			<Paperclip className={styles.icon} />
		</Button>
	);
}
