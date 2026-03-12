'use client';

import { useState } from 'react';
import { sendMessage } from '../../model/lib/sendMessage';
import { VoiceFile } from '../../model/types/types';
import { AttachmentButton } from '../AttachmentButton/AttachmentButton';
import { MessageForm } from '../MessageForm/MessageForm';
import styles from './MessageFormComponent.module.scss';

export function MessageFormComponent({ userUid }: { userUid: string }) {
	const [files, setFiles] = useState<VoiceFile[]>([]);
	const [filledField, setFilledField] = useState(false);

	const handleSend = async (message: string) => {
		// Убрать, когда уже не будет нужен console.log
		const textResponse = await sendMessage(userUid, {
			content: message,
			files: files ? files : []
		});
		console.log('textResponse', textResponse);

		//После окончательной доработки оставить этот код:
		// 	await sendMessage(userUid, {
		// 		content: message,
		// 		files: files ? files : []
		// 	});

		setFiles([]);
	};

	// Убрать, когда уже не будет нужен console.log
	const handleSendVoice = async (voice: VoiceFile) => {
		const voiceResp = await sendMessage(userUid, { files: [voice] });
		console.log('voiceResp', voiceResp);
	};

	//После окончательной доработки оставить этот код:
	// const handleSendVoice = async (voice: VoiceFile) => {
	// 	await sendMessage(userUid, { files: [voice] });
	// };

	return (
		<section className={styles.messageFormComponent}>
			<AttachmentButton setFiles={setFiles} />
			<MessageForm
				onSendContent={handleSend}
				filledField={filledField}
				setFilledField={setFilledField}
			/>
			{/* Восстановить, когда будет готов VoiceRecorder */}
			{/* {!filledField && <VoiceRecorder onSendVoice={handleSendVoice} />} */}
		</section>
	);
}
