import { AuthSchema } from '@/features/auth';
import { CitiesSchema } from '@/pages/Cities';
import { localApi } from '@/shared/api/localApi';
import { rtkApi } from '@/shared/api/rtkApi';
import { ChatListSearchSchema } from '@/features/ChatList/model/slice/chatListSearchSlice';

export interface StateSchema {
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
	[localApi.reducerPath]: ReturnType<typeof localApi.reducer>;
	cities: CitiesSchema;
	auth: AuthSchema;
	chatListSearch: ChatListSearchSchema;
}
