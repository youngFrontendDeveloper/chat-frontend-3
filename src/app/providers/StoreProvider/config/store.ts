import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';

import { rtkApi } from '@/shared/api/rtkApi';
import { chatListSearchReducer } from '@/features/ChatList/model';
import type { StateSchema } from './StateSchema';

const reducers: ReducersMapObject<StateSchema> = {
	[rtkApi.reducerPath]: rtkApi.reducer,
	chatListSearch: chatListSearchReducer
};

const rootReducer = combineReducers(reducers);

export const makeStore = (preloadedState?: Partial<StateSchema>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState as StateSchema,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(rtkApi.middleware),
		devTools: process.env.NODE_ENV !== 'production'
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
