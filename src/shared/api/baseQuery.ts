import { RootState } from '@/app/providers/StoreProvider';

import { authActions } from '@/features/auth/model/slices/authSlice';
import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { logoutFromInterceptor } from './services/logoutForInterceptor/logoutForInterceptor';

// Интерцептор 1: добавление accessToken в заголовок
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_PROXY_PREFIX
});

// Интерцептор 2: refresh при 401
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		// 1. Ждем завершения текущего refresh, чтобы избежать состояния гонки
		if ((api.getState() as RootState).auth?.isRefreshing) {
			await new Promise(resolve => {
				const check = () => {
					if (!(api.getState() as RootState).auth?.isRefreshing) {
						resolve(true);
					} else {
						setTimeout(check, 50);
					}
				};
				check();
			});
			return baseQuery(args, api, extraOptions);
		}

		api.dispatch(authActions.setRefreshing(true));

		// 2. делаем запрос на refresh
		try {
			const refreshResult = await fetch('/api/auth/refresh', {
				method: 'POST'
			});

			if (refreshResult.hasOwnProperty('error')) {
				api.dispatch(authActions.logout());
				await logoutFromInterceptor();
				return result;
			}

			// 3. Повторяем исходный запрос с новым токеном
			return baseQuery(args, api, extraOptions);
		} catch (_) {
			api.dispatch(authActions.logout());
			await logoutFromInterceptor();
			return result;
		} finally {
			api.dispatch(authActions.setRefreshing(false));
		}
	}

	return result;
};

export default baseQueryWithReauth;
