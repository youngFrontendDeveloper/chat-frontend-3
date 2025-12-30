import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatListSearchState {
	query: string;
}

const initialState: ChatListSearchState = {
	query: ''
};

const chatListSearchSlice = createSlice({
	name: 'chatListSearch',
	initialState,
	reducers: {
		setChatListSearchQuery(state, action: PayloadAction<string>) {
			state.query = action.payload;
		},
		clearChatListSearchQuery(state) {
			state.query = '';
		}
	}
});

export const { setChatListSearchQuery, clearChatListSearchQuery } =
	chatListSearchSlice.actions;

export const chatListSearchReducer = chatListSearchSlice.reducer;
