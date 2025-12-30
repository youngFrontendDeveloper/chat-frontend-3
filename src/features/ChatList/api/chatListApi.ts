import { rtkApi } from '@/shared/api/rtkApi';
import { ChatListResponse } from '../model/types';

export const chatListApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getAllChats: build.query<ChatListResponse, void>({
			query: () => ({
				url: '/api/v1/chat/list/',
				params: {
					page_size: 100,
					ordering: '-last_activity_at'
				}
			}),
			providesTags: ['Chats']
		})
	})
});

export const { useGetAllChatsQuery } = chatListApi;
