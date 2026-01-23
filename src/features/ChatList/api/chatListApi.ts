import { rtkApi } from '@/shared/api/rtkApi';
import type { ChatListResponse } from '../model/types';
import { mockChatListResponse } from '../model/mocks';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'false';

export const chatListApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getAllChats: build.query<ChatListResponse, void>({
			...(USE_MOCKS
				? {
						queryFn: async () => {
							return { data: mockChatListResponse };
						}
					}
				: {
						query: () => ({
							url: 'chat/list/', // можно без ведущего /
							params: {
								page_size: 100,
								ordering: '-last_activity_at'
							}
						})
					})
		})
	})
});

export const { useGetAllChatsQuery } = chatListApi;
