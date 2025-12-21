'use client';
import { SearchUsers } from '@/features/SearchUsers/ui/SearchUsers/SearchUsers';
import cls from './ChatList.module.scss';

export const ChatList = () => {
	return (
		<aside
			className='chat-list-panel'
			style={{ width: '320px', borderRight: '1px solid #333', padding: '10px' }}
		>
			{/* Поиск в самом верху */}
			<div style={{ marginBottom: '20px' }}>
				<SearchUsers />
			</div>

			{/* Тут потом будет список чатов */}
			<div className='chats'>
				<p style={{ color: '#888' }}>Список чатов...</p>
			</div>
		</aside>
	);
};
