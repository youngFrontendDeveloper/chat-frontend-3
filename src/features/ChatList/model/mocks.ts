import type { ChatListResponse } from './types';

const now = Date.now();

export const mockChatListResponse: ChatListResponse = {
	count: 8,
	next: null,
	previous: null,
	results: [
		{
			id: 101,
			chat: {
				uid: 'u-oleg',
				username: 'oleg',
				first_name: 'Олег',
				last_name: 'Ермаков',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: true,
				was_online_at: now - 15_000,
				is_in_contacts: true
			},
			is_group: false,
			notification: true,
			new_message_count: 2,
			name: 'Руслан Ермаков',
			chat_type: 'chat',
			last_activity_at: now - 10_000,
			last_seen_message: {
				id: 9001,
				uid: 'm-9001',
				from_user: 'u-oleg',
				content:
					'Проверяем моковый список чатов. Поиск сверху должен фильтровать по имени/юзернейму и тексту последнего сообщения.',
				files_summary: { types: [], count: 0 },
				has_replied_message: false,
				has_forwarded_message: false,
				new: true,
				created_at: now - 12_000,
				updated_at: now - 10_500
			}
		},
		{
			id: 102,
			chat: {
				uid: 'u-anna',
				username: 'anna',
				first_name: 'Анна',
				last_name: 'К.',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 3_600_000,
				is_in_contacts: true
			},
			is_group: false,
			notification: false,
			new_message_count: 0,
			name: 'Анна К.',
			chat_type: 'chat',
			last_activity_at: now - 3_200_000,
			last_seen_message: {
				id: 9002,
				uid: 'm-9002',
				from_user: 'u-anna',
				content:
					'Давай проверим поиск: фамилия, username и контент последнего сообщения.',
				files_summary: { types: [], count: 0 },
				has_replied_message: true,
				has_forwarded_message: false,
				new: false,
				created_at: now - 3_300_000,
				updated_at: now - 3_250_000
			}
		},
		{
			id: 201,
			chat: {
				uid: 'g-frontend',
				username: 'frontend-team',
				first_name: '',
				last_name: '',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 120_000,
				is_in_contacts: true
			},
			is_group: true,
			notification: true,
			new_message_count: 14,
			name: 'Frontend Team',
			chat_type: 'group',
			last_activity_at: now - 40_000,
			last_seen_message: {
				id: 9101,
				uid: 'm-9101',
				from_user: 'u-anna',
				content: 'В группе тоже должен работать поиск по последнему сообщению.',
				files_summary: { types: ['image'], count: 1 },
				has_replied_message: false,
				has_forwarded_message: true,
				new: true,
				created_at: now - 60_000,
				updated_at: now - 55_000
			}
		},
		{
			id: 202,
			chat: {
				uid: 'c-news',
				username: 'announcements',
				first_name: '',
				last_name: '',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 86_400_000,
				is_in_contacts: false
			},
			is_group: false,
			notification: true,
			new_message_count: 1,
			name: 'Announcements',
			chat_type: 'channel',
			last_activity_at: now - 200_000,
			last_seen_message: {
				id: 9201,
				uid: 'm-9201',
				from_user: 'c-news',
				content: 'Обновление: сегодня проверяем моковые данные и UI.',
				files_summary: { types: [], count: 0 },
				has_replied_message: false,
				has_forwarded_message: false,
				new: true,
				created_at: now - 210_000,
				updated_at: now - 205_000
			}
		},
		{
			id: 103,
			chat: {
				uid: 'u-ruslan',
				username: 'ruslan',
				first_name: 'Руслан',
				last_name: 'П.',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 9_000_000,
				is_in_contacts: true
			},
			is_group: false,
			notification: false,
			new_message_count: 5,
			name: 'Руслан П.',
			chat_type: 'chat',
			last_activity_at: now - 8_800_000,
			last_seen_message: {
				id: 9003,
				uid: 'm-9003',
				from_user: 'u-ruslan',
				content: 'Тест: найди меня по слову “Руслан” или по username “ruslan”.',
				files_summary: { types: ['pdf', 'image'], count: 2 },
				has_replied_message: false,
				has_forwarded_message: false,
				new: true,
				created_at: now - 8_900_000,
				updated_at: now - 8_850_000
			}
		},
		{
			id: 301,
			chat: {
				uid: 'g-design',
				username: 'design-group',
				first_name: '',
				last_name: '',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: true,
				was_online_at: now - 5_000,
				is_in_contacts: true
			},
			is_group: true,
			notification: true,
			new_message_count: 0,
			name: 'Design',
			chat_type: 'group',
			last_activity_at: now - 70_000,
			last_seen_message: {
				id: 9301,
				uid: 'm-9301',
				from_user: 'u-oleg',
				content: 'Сделаем потом аватарки и нормальную сетку блоков.',
				files_summary: { types: [], count: 0 },
				has_replied_message: false,
				has_forwarded_message: false,
				new: false,
				created_at: now - 75_000,
				updated_at: now - 72_000
			}
		},
		{
			id: 104,
			chat: {
				uid: 'u-no-msg',
				username: 'empty',
				first_name: 'Пустой',
				last_name: 'Чат',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 20_000_000,
				is_in_contacts: true
			},
			is_group: false,
			notification: false,
			new_message_count: 0,
			name: 'Пустой Чат',
			chat_type: 'chat',
			last_activity_at: now - 20_000_000,
			last_seen_message: null
		},
		{
			id: 401,
			chat: {
				uid: 'c-releases',
				username: 'releases',
				first_name: '',
				last_name: '',
				avatar_url: null,
				avatar_webp_url: null,
				is_online: false,
				was_online_at: now - 600_000,
				is_in_contacts: false
			},
			is_group: false,
			notification: true,
			new_message_count: 3,
			name: 'Releases',
			chat_type: 'channel',
			last_activity_at: now - 300_000,
			last_seen_message: {
				id: 9401,
				uid: 'm-9401',
				from_user: 'c-releases',
				content:
					'Release notes: исправили 404, включили моковый список, проверяем поиск.',
				files_summary: { types: [], count: 0 },
				has_replied_message: false,
				has_forwarded_message: false,
				new: true,
				created_at: now - 320_000,
				updated_at: now - 310_000
			}
		}
	]
};
