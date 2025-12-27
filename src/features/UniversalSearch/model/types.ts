export interface ChatItem {
	id: number;
	chat: {
		uid: string;
		username: string;
		first_name: string;
		last_name: string;
		avatar_url: string | null;
		avatar_webp_url: string | null;
		is_online: boolean;
		was_online_at: number;
		is_in_contacts: boolean;
	};
	is_group: boolean;
	notification: boolean;
	new_message_count: number;
	name: string;
	chat_type: 'chat' | 'channel' | 'group';
	last_activity_at: number;
	last_seen_message: {
		id: number;
		uid: string;
		from_user: string;
		content: string;
		files_summary: { types: string[]; count: number };
		has_replied_message: boolean;
		has_forwarded_message: boolean;
		new: boolean;
		created_at: number;
		updated_at: number;
	} | null;
}

export interface SearchResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ChatItem[];
}
