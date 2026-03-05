export function filterContacts<
	T extends {
		first_name?: string;
		last_name?: string;
		nickname?: string;
		username?: string;
	}
>(items: T[], searchTerm: string): T[] {
	const term = searchTerm.toLowerCase().trim();
	if (!term) {
		return items;
	}

	return items.filter(item => {
		const firstName = item.first_name?.toLowerCase() || '';
		const lastName = item.last_name?.toLowerCase() || '';
		const nickname = item.nickname?.toLowerCase() || '';
		const username = item.username?.toLowerCase() || '';

		return (
			firstName.includes(term) ||
			lastName.includes(term) ||
			nickname.includes(term) ||
			username.includes(term)
		);
	});
}
