'use client';

import { Microphone, MicrophoneFilled } from '@icons/index';
import { useEffect } from 'react';
import { useVoiceRecorder } from '../../model/hooks/useVoiceRecorder';
import { VoiceFile } from '../../model/types/types';
import styles from './VoiceRecorder.module.scss';

type Props = {
	onSendVoice: (file: VoiceFile) => void;
};

export function VoiceRecorder({ onSendVoice }: Props) {
	const { startRecording, stopRecording, isRecording, audioFile, audioName } =
		useVoiceRecorder();

	const handlePointerDown = () => {
		startRecording();
	};

	useEffect(() => {
		if (!isRecording) {
			return;
		}

		const handlePointerUp = () => {
			stopRecording();
		};

		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointercancel', handlePointerUp);

		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointercancel', handlePointerUp);
		};
	}, [isRecording, stopRecording]);

	useEffect(() => {
		if (!audioFile || !audioName) {
			return;
		}

		onSendVoice({
			data: audioFile,
			filename: audioName
		});
	}, [audioFile, audioName, onSendVoice]);

	return (
		<button
			type='button'
			onPointerDown={handlePointerDown}
			className={styles.button}
			aria-label='Начать запись голосового сообщения'
		>
			{isRecording ? (
				<MicrophoneFilled className={styles.icon} />
			) : (
				<Microphone className={styles.icon} />
			)}
		</button>
	);
}
