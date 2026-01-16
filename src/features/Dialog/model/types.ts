export type MessageAuthor = 'me' | 'other';

export interface DialogMessage {
	id: string;
	chatUid: string;
	author: MessageAuthor;
	text: string;
	createdAt: number;
}
