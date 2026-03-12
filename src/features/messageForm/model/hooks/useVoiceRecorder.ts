'use client';

import { useRef, useState } from 'react';
import { convertVoice } from '../api/convertVoice';

export const useVoiceRecorder = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [audioFile, setAudioFile] = useState('');
	const [audioName, setAudioName] = useState('');
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const mimeType = 'audio/webm;codecs=opus';

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		const mediaRecorder = new MediaRecorder(stream, {
			mimeType,
			audioBitsPerSecond: 24000
		});

		mediaRecorderRef.current = mediaRecorder;

		chunksRef.current = [];

		mediaRecorder.ondataavailable = e => {
			chunksRef.current.push(e.data);
		};

		mediaRecorder.start();
		setIsRecording(true);
	};

	const stopRecording = () => {
		const mediaRecorder = mediaRecorderRef.current;

		if (!mediaRecorder) {
			return;
		}

		mediaRecorder.onstop = async () => {
			const blob = new Blob(chunksRef.current, { type: mimeType });

			chunksRef.current = [];

			try {
				const result = await convertVoice(blob);
				setAudioFile(result.base64);
				setAudioName(result.filename);
			} catch (e) {
				console.error('Voice conversion error', e);
			}
		};

		mediaRecorder.stop();
		setIsRecording(false);
	};

	const reset = () => {
		setAudioFile('');
		setAudioName('');
	};

	return {
		isRecording,
		audioFile,
		startRecording,
		stopRecording,
		audioName,
		reset
	};
};
