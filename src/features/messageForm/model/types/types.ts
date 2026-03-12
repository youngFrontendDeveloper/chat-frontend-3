export type MessageFormTypes = {
	message: string;
	file: VoiceFile;
};

export type VoiceFile = {
	filename: string;
	data: string;
	type?: string;
};

export type SendMessageParams = {
	content?: string;
	files?: VoiceFile[];
	replyIds?: string[];
	forwardIds?: string[];
};
