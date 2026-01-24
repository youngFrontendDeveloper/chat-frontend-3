import { RootState } from '@/app/providers/StoreProvider';
import { authActions } from '@/features/auth/model/slices/authSlice';
import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { logoutFromInterceptor } from './services/logoutForInterceptor/logoutForInterceptor';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_PROXY_PREFIX ?? '/api/proxy/',
	credentials: 'include'
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
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

		try {
			const refreshResult = await fetch('/api/auth/refresh', {
				method: 'POST'
			});

			if ((refreshResult as unknown as { error?: unknown }).error) {
				api.dispatch(authActions.logout());
				await logoutFromInterceptor();
				return result;
			}

			return baseQuery(args, api, extraOptions);
		} catch {
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
