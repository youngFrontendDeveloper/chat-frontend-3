import { rtkApi } from '@/shared/api/rtkApi';
import { SearchResponse } from '../model/types';

export const searchApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		searchChats: build.query<
			SearchResponse,
			{ search?: string; page?: number }
		>({
			query: ({ search = '', page = 1 }) => ({
				url: '/api/v1/chat/list/',
				params: {
					search,
					page,
					page_size: 20,
					ordering: '-last_activity_at' // Сортировка по последней активности
				}
			}),
			providesTags: ['Chats']
		})
	})
});

export const { useSearchChatsQuery } = searchApi;
