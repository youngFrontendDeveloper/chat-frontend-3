import { profileActions, ProfileSchema } from '@/entities/Profile';
import { rtkApi } from '@/shared/api/rtkApi';

export const profileApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		//удалить после изменения в Avatar, SettingsPage и UserCard
		// getProfile: build.query<ProfileSchema, void>({
		// 	query: () => ({
		// 		url: `/auth/messenger/profile/`,
		// 		method: 'POST',
		// 		body: {}
		// 	}),
		// 	providesTags: ['EditProfile']
		// }),

		//  Редактирование
		editProfile: build.mutation<ProfileSchema, Partial<ProfileSchema>>({
			query: data => ({
				url: `/auth/messenger/profile/`,
				method: 'POST',
				body: data
			}),

			invalidatesTags: ['EditProfile'],

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(profileActions.setProfile(data));
				} catch (_) {}
			}
		}),
		deleteProfile: build.mutation({
			query: () => ({
				url: '/auth/messenger/profile/',
				method: 'DELETE'
			}),
			invalidatesTags: ['Profile', 'EditProfile']
		})
	}),
	// Отправка запроса за свежими данными
	overrideExisting: true
});

export const { useEditProfileMutation, useDeleteProfileMutation } = profileApi;
