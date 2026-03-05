export function filterByField<T>(
	items: T[],
	searchTerm: string,
	field: keyof T
): T[] {
	const term = searchTerm.toLowerCase().trim();
	if (!term) {
		return [];
	}

	return items.filter(item => {
		const value = (item[field] as string | undefined)?.toLowerCase() || '';
		return value.includes(term);
	});
}
