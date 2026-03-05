import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useHybridSearch<T>(
	localData: T[],
	localFilterFn: (items: T[], searchTerm: string) => T[],
	globalSearchFn: (searchTerm: string, signal?: AbortSignal) => Promise<T[]>,
	debounceDelay: number = 300,
	globalPrefix: string = '@',
	globalMinLength: number = 3
) {
	const [searchTerm, setSearchTerm] = useState('');
	const [globalResults, setGlobalResults] = useState<T[]>([]);

	const [isGlobal, setIsGlobal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	const localResults = useMemo(() => {
		if (!searchTerm.trim()) {
			return localData;
		}
		return localFilterFn(localData, searchTerm);
	}, [localData, searchTerm, localFilterFn]);

	const debouncedLocalSearch = useDebounce((term: string) => {}, debounceDelay);

	const debouncedGlobalSearch = useDebounce(async (term: string) => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		const controller = new AbortController();
		abortControllerRef.current = controller;

		if (term.length === 0 || term.length < globalMinLength) {
			setGlobalResults([]);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const data = await globalSearchFn(term, controller.signal);
			setGlobalResults(data);
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') {
				return;
			}
			setError(err instanceof Error ? err : new Error('Search failed'));
		} finally {
			if (!controller.signal.aborted) {
				setIsLoading(false);
			}
		}
	}, debounceDelay);

	const isGlobalSearch = useCallback(
		(term: string): boolean => term.trim().startsWith(globalPrefix),
		[globalPrefix]
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchTerm(value);
			const trimmed = value.trim();

			if (trimmed.length === 0) {
				setGlobalResults([]);
				setIsGlobal(false);
				setError(null);
				return;
			}

			const global = isGlobalSearch(trimmed);
			setIsGlobal(global);

			if (global) {
				const searchQuery = trimmed.slice(globalPrefix.length).trim();

				if (!searchQuery || searchQuery.length < globalMinLength) {
					setGlobalResults([]);
					setIsLoading(false);
					return;
				}

				debouncedGlobalSearch(searchQuery);
			} else {
				debouncedLocalSearch(trimmed);
			}
		},
		[
			isGlobalSearch,
			globalPrefix,
			globalMinLength,
			debouncedLocalSearch,
			debouncedGlobalSearch
		]
	);

	const handleClear = useCallback(() => {
		setSearchTerm('');
		setGlobalResults([]);
		setIsGlobal(false);
		setError(null);

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	const combinedResults = useMemo(() => {
		if (isGlobal) {
			return globalResults;
		}
		return localResults;
	}, [isGlobal, globalResults, localResults]);

	return useMemo(
		() => ({
			searchTerm,
			globalResults,
			localResults,
			results: combinedResults,
			isGlobal,
			isLoading,
			error,
			handleSearchChange,
			handleClear,
			setGlobalResults
		}),
		[
			searchTerm,
			globalResults,
			localResults,
			combinedResults,
			isGlobal,
			isLoading,
			error,
			handleSearchChange,
			handleClear
		]
	);
}

export type UseHybridSearchReturn<T> = ReturnType<typeof useHybridSearch<T>>;
