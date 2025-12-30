import type { rtkApi } from '@/shared/api/rtkApi';
import type { ChatListSearchState } from '@/features/ChatList/model/slice/chatListSearchSlice';

export interface StateSchema {
	[rtkApi.reducerPath]: ReturnType<(typeof rtkApi)['reducer']>;
	chatListSearch: ChatListSearchState;
}
