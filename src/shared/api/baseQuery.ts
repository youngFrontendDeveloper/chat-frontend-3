import {
	fetchBaseQuery,
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? 'http://localhost:8000';
const REFRESH_PATH =
	process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH ?? '/api/v1/auth/refresh/';
const ACCESS_TOKEN_KEY =
	process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? 'access_token';

const rawBaseQuery = fetchBaseQuery({
	baseUrl: BASE_API,
	credentials: 'include',
	prepareHeaders: headers => {
		headers.set('accept', 'application/json');

		if (typeof window !== 'undefined') {
			const token = localStorage.getItem(ACCESS_TOKEN_KEY);
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
		}

		return headers;
	}
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const refreshResult = await rawBaseQuery(
			{ url: REFRESH_PATH, method: 'POST' },
			api,
			extraOptions
		);

		if (refreshResult.data) {
			const data = refreshResult.data as { access_token?: string };

			if (data.access_token && typeof window !== 'undefined') {
				localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
			}

			result = await rawBaseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export default baseQueryWithReauth;
