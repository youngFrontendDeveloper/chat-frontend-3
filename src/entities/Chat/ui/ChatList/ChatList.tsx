'use client';

import { memo, useMemo, useCallback } from 'react';
import { ChatListItem } from '../ChatListItem/ChatListItem';
import { filterChatsLocal, Search, useHybridSearch } from '@/shared/ui/Search';
import { useGetChatsQuery, useLazyGetChatsQuery } from '../../api/chatApi';
import { UserCardSkeleton } from '@/shared/ui/Skeleton';
import EmptyChats from '@/shared/ui/EmptyChats/EmptyChats';
import { UserCardType } from '@/shared/ui/UserCard';
import { Chat, GetChatsRequest } from '../../model/types/chat.types';
import { mockChats } from '../../mock/mockData';
import { appConfig } from '@/shared/config/app.config';
import cls from './ChatList.module.scss';

// 🎛 Переключатель режима: true = моки, false = реальные данные из API
const LOCAL_CACHE_SIZE = 30;
const GLOBAL_SEARCH_MIN_LENGTH = 3;

export interface ChatListProps {
	selectedChatUid?: string | null;
}

export const ChatList = memo(({ selectedChatUid }: ChatListProps) => {
	// 1. Загрузка данных из API (для глобального поиска и продакшена)
	const { data: cacheResponse, isLoading: isCacheLoading } = useGetChatsQuery({
		pageSize: LOCAL_CACHE_SIZE,
		ordering: '-last_activity_at'
	} as GetChatsRequest);

	// 4. Источники данных
	//  Mock data (только для разработки/тестов)
	//  Переключай USE_MOCKS выше, чтобы менять режим без правки кода
	const localChats = useMemo(() => {
		// ✅ Используем конфиг из env
		if (appConfig.USE_MOCKS) {
			console.log('🧪 Using mock data (USE_MOCKS=true)');
			return mockChats;
		}
		return cacheResponse?.results ?? [];
	}, [cacheResponse]);

	//////////////////////////////////////////////////////////
	//! ПРОВЕРЯЕМ НАЛИЧИЕ ЧАТОВ НА БЭКЕ (удалишь после проверки и отладки как появятся данные на бэке)
	console.log('📦 ChatList - API Response:', {
		isLoading: isCacheLoading,
		hasData: !!cacheResponse,
		chatsCount: cacheResponse?.results?.length ?? 0,
		firstChat: cacheResponse?.results?.[0], // покажет структуру первого чата
		fullResponse: cacheResponse
	});
	/////////////////////////////////

	// 2. Lazy-триггер для глобального поиска (RTK Query)
	const [triggerGlobalSearch] = useLazyGetChatsQuery();

	const fetchGlobalChats = useCallback(
		async (searchTerm: string): Promise<Chat[]> => {
			const result = await triggerGlobalSearch({
				search: searchTerm,
				pageSize: 50,
				ordering: '-last_activity_at'
			} as GetChatsRequest).unwrap();

			return result?.results ?? [];
		},
		[triggerGlobalSearch]
	);

	// 3. Гибридный поиск (локальный + глобальный)
	const {
		searchTerm,
		results: displayChats,
		isGlobal,
		isLoading: isSearching,
		error: searchError,
		handleSearchChange,
		handleClear
	} = useHybridSearch<Chat>(
		localChats, // Локальные данные
		filterChatsLocal, // Оптимизированный фильтр
		fetchGlobalChats, // Глобальный поиск через RTK Query
		300, // debounce: 300ms
		'@', // префикс для глобального поиска
		GLOBAL_SEARCH_MIN_LENGTH // ← globalMinLength: не искать, если < GLOBAL_SEARCH_MIN_LENGTH(в данном случае - 3) символов после @
	);

	// 4. Флаги состояния
	const isLoading = (isCacheLoading || !localChats.length) && !searchTerm;
	const hasMinLength =
		searchTerm.trim().replace(/^@/, '').length >= GLOBAL_SEARCH_MIN_LENGTH;
	const shouldShowSkeleton =
		isLoading ||
		(isSearching && isGlobal && hasMinLength && displayChats.length === 0);
	const isEmpty = !isLoading && !isSearching && displayChats.length === 0;
	const hasError = !!searchError && isGlobal && hasMinLength;

	// 5. Рендер: Скелетон
	if (shouldShowSkeleton) {
		return (
			<div className={cls.chatList}>
				<div className={cls.search}>
					<Search
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder='Поиск чатов...'
						showIcon={true}
					/>
				</div>
				<div className={cls.list} role='listbox' aria-busy='true'>
					<UserCardSkeleton count={8} type={UserCardType.CHAT} />
				</div>
			</div>
		);
	}

	// 6. Рендер: Ошибка
	if (hasError) {
		return (
			<div className={cls.chatList}>
				<div className={cls.search}>
					<Search
						value={searchTerm}
						onChange={handleSearchChange}
						onClear={handleClear}
						placeholder='Глобальный поиск (@username)...'
						showIcon={true}
					/>
				</div>
				<div className={cls.empty} role='alert' aria-live='assertive'>
					<EmptyChats />
				</div>
			</div>
		);
	}

	// 7. Основной рендер
	return (
		<div className={cls.chatList} aria-label='Список чатов'>
			<div className={cls.search}>
				<Search
					value={searchTerm}
					onChange={handleSearchChange}
					onClear={handleClear}
					placeholder={
						isGlobal
							? 'Глобальный поиск (@username)...'
							: appConfig.USE_MOCKS
								? 'Поиск по мокам...'
								: 'Поиск чатов...'
					}
					showIcon={true}
				/>
			</div>

			{isEmpty ? (
				<div className={cls.empty} role='status' aria-live='polite'>
					<EmptyChats />
				</div>
			) : (
				<div className={cls.list} role='listbox' aria-multiselectable='false'>
					{displayChats.map((chat: Chat) => (
						<ChatListItem
							key={chat.id}
							chat={chat}
							isActive={selectedChatUid === chat.chat.uid}
						/>
					))}
				</div>
			)}
		</div>
	);
});

ChatList.displayName = 'ChatList';
