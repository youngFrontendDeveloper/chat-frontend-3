import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const selectChatListSearchQuery = (state: StateSchema) =>
	state.chatListSearch?.query ?? '';
