import { rtkApi } from '@/shared/api/rtkApi';
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	EndpointBuilder
} from '@reduxjs/toolkit/query';

export interface User {
	id: number;
	username: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
}

const searchUsersApi = rtkApi.injectEndpoints({
	endpoints: (
		build: EndpointBuilder<
			BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
			never,
			'rtkApi'
		>
	) => ({
		searchUsers: build.query<User[], string>({
			query: (search: string) => ({
				url: '/users/search',
				params: { search }
			})
		})
	}),
	overrideExisting: false
});

export const { useSearchUsersQuery } = searchUsersApi;
