'use client';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonColor } from '@/shared/ui/Button';
import { Smile } from '@icons/index';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from './EmojiPickerComponent.module.scss';

const Picker = dynamic(() => import('emoji-picker-react'), {
	ssr: false // критически важно для Next.js!
	// loading: () => <div>Загрузка эмодзи...</div>
});

interface EmojiPickerComponent {
	parentClass?: string;
	onEmojiSelect: (emoji: string) => void;
}

export function EmojiPickerComponent({
	parentClass,
	onEmojiSelect
}: EmojiPickerComponent) {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button
				color={ButtonColor.TRANSPARENT}
				className={classNames(styles.button, {}, [parentClass])}
				aria-label='Прикрепить файл'
				onClick={() => setShowPicker(!showPicker)}
			>
				<Smile width={20} height={20} />
			</Button>

			{showPicker && (
				<Picker
					width={350}
					height={450}
					onEmojiClick={emojiData => {
						console.log(emojiData);
						onEmojiSelect(emojiData.emoji);
						setShowPicker(false);
					}}
					className={styles.picker}
				/>
			)}
		</div>
	);
}
