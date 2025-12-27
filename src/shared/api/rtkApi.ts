import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQuery';

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Contacts', 'Auth', 'Chats'],
	endpoints: builder => ({})
});
