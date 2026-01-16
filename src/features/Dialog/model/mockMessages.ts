import type { DialogMessage } from './types';

const now = Date.now();

export const mockMessages: DialogMessage[] = [
	{
		id: 'm1',
		chatUid: 'u-oleg',
		author: 'other',
		text: 'Привет! Проверяем моковый диалог.',
		createdAt: now - 1000 * 60 * 60
	},
	{
		id: 'm2',
		chatUid: 'u-oleg',
		author: 'me',
		text: 'Да, вижу. Сейчас подключим отображение справа.',
		createdAt: now - 1000 * 60 * 58
	},
	{
		id: 'm3',
		chatUid: 'u-anna',
		author: 'other',
		text: 'Проверь, что поиск работает по имени и по последнему сообщению.',
		createdAt: now - 1000 * 60 * 40
	},
	{
		id: 'm4',
		chatUid: 'g-frontend',
		author: 'other',
		text: 'В группе тоже должно быть всё ок.',
		createdAt: now - 1000 * 60 * 20
	},
	{
		id: 'm5',
		chatUid: 'g-frontend',
		author: 'me',
		text: 'Принято, делаем.',
		createdAt: now - 1000 * 60 * 18
	}
];
