export interface BlackListResponse {
	count: number;
	next: string;
	previous: string;
	results: BlackListSchema[];
}

export interface BlackListSchema {
	uid: string;
	username: string;
	nickname: string;
	phone: string;
	first_name: string;
	last_name: string;
	avatar: string;
	avatar_url: string;
	avatar_webp: string;
	avatar_webp_url: string;
	additional_information: string;
	birthday: number;
	chat_id: number;
	is_online: boolean;
	was_online_at: number;
	name?: string;
}
