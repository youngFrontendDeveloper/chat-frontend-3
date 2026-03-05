export function filterByName<T extends Record<string, unknown>>(
	items: T[],
	searchTerm: string,
	fieldName: keyof T = 'name' as keyof T
): T[] {
	const term = searchTerm.toLowerCase().trim();
	if (!term) {
		return items;
	}

	return items.filter(item => {
		const value = item[fieldName];
		if (typeof value !== 'string') {
			return false;
		}
		return value.toLowerCase().includes(term);
	});
}

export function filterByNameExtended<T extends Record<string, unknown>>(
	items: T[],
	searchTerm: string,
	fields: Array<keyof T> = ['nickname', 'first_name', 'last_name'] as Array<
		keyof T
	>
): T[] {
	const term = searchTerm.toLowerCase().trim();
	if (!term) {
		return items;
	}

	return items.filter(item =>
		fields.some(field => {
			const value = item[field];
			return typeof value === 'string' && value.toLowerCase().includes(term);
		})
	);
}

export function filterChatsLocal<
	T extends {
		name: string;
		chat: {
			username?: string | null;
			nickname?: string | null;
			first_name?: string | null;
			last_name?: string | null;
			patronymic?: string | null;
		};
		last_message?: { content?: string | null } | null;
	}
>(items: T[], searchTerm: string): T[] {
	const term = searchTerm.toLowerCase().trim();
	if (!term) {
		return items;
	}
	return items.filter(item => {
		if (item.name.toLowerCase().includes(term)) {
			return true;
		}

		if (item.last_message?.content?.toLowerCase().includes(term)) {
			return true;
		}

		const { chat } = item;

		return (
			chat.username?.toLowerCase().includes(term) ||
			chat.nickname?.toLowerCase().includes(term) ||
			chat.first_name?.toLowerCase().includes(term) ||
			chat.last_name?.toLowerCase().includes(term) ||
			chat.patronymic?.toLowerCase().includes(term)
		);
	});
}
