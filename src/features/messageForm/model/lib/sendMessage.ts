import { sendWS } from '@/shared/api/WS/services/socketClient/socketClient';
import { SendMessageParams } from '../types/types';

export async function sendMessage(userUid: string, params: SendMessageParams) {
	return sendWS({
		action: 'create_text_message',
		request_uid: crypto.randomUUID(),
		object: {
			to_user_uid: userUid,
			content: params.content ?? '',
			status: 'publish',
			files: params.files ?? [],
			replied_messages: params.replyIds ?? [],
			forwarded_messages: params.forwardIds ?? []
		}
	});
}
