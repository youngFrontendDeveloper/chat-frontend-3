import { rtkApi } from '@/shared/api/rtkApi';
import type { ChatListResponse, GetAllChatsRequest } from '../model/types';

export const chatListApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getAllChats: build.query<ChatListResponse, GetAllChatsRequest | void>({
			query: query => {
				const pageSize = query?.pageSize ?? 100;
				const ordering = query?.ordering ?? '-last_activity_at';
				const search = query?.searchQuery?.trim()
					? query.searchQuery.trim()
					: undefined;

				return {
					url: '/chat/list', // без завершающего слэша
					params: {
						page_size: pageSize,
						ordering,
						search
					}
				};
			},
			providesTags: ['Chats']
		})
	})
});

export const { useGetAllChatsQuery } = chatListApi;
