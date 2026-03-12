'use client';

import { ChatList } from '@/entities/Chat';
import { Container, ContainerType } from '@/shared/ui/Container';
import { ChatWidget } from '@/widgets/Chat';
import { useParams } from 'next/navigation';
import { memo } from 'react';

import { MessagesPage } from '@/pages/Chats/ui/MessagesPage/MessagesPage';
import cls from './Chats.module.scss';

const ChatsPageComponent = () => {
	const params = useParams();
	// const chatUid = params?.uid as string | undefined;

	// Тестовые uid - потом подключить реальные
	const userUid = '2089f9d3-ea44-4d30-876a-ddf177fa352a'; //5555555555
	// const userUid = '54cdbe82-28aa-4abf-a69d-525d0ab4da93';  // 7777777777

	const chatUid = userUid;

	return (
		<Container type={ContainerType.WRAPPER}>
			<Container type={ContainerType.SIDEBAR}>
				<ChatList selectedChatUid={chatUid ?? null} />
			</Container>

			<Container type={ContainerType.CONTENT}>
				{chatUid ? (
					<div className={cls.emptyState}>
						<MessagesPage userUid={chatUid} />
						{/* <NotMessage /> */}
					</div>
				) : (
					<ChatWidget chatUid={chatUid} />
				)}
			</Container>
			{/* <Container type={ContainerType.CONTENT}>
				{chatUid ? (
					<ChatWidget chatUid={chatUid} />
				) : (
					<div className={cls.emptyState}>
						<MessagesPage />					
					</div>
				)}
			</Container> */}
		</Container>
	);
};

export const ChatsPage = memo(ChatsPageComponent);

ChatsPage.displayName = 'ChatsPage';

// 'use client';

// import { ChatList } from '@/entities/Chat';
// import { Container, ContainerType } from '@/shared/ui/Container';
// import NotMessage from '@/shared/ui/NotMessage/NotMessage';
// import { ChatWidget } from '@/widgets/Chat';
// import { memo } from 'react';

// import { useParams } from 'next/navigation';
// import cls from './Chats.module.scss';

// const ChatsPageComponent = () => {
// 	const params = useParams();
// 	const chatUid = params?.uid as string | undefined;

// 	const chats: ChatItemSchema[] = [
// 		{
// 			id: 1,
// 			chat: {
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				username: 'Владлен',
// 				nickname: 'afisovvlad',
// 				first_name: 'Владислав1212312312312312312',
// 				last_name: 'Афисов',
// 				avatar: 'string',
// 				avatar_url:
// 					'https://interesnyefakty.org/wp-content/uploads/chto-takoe-avatar.jpg',
// 				avatar_webp: 'string',
// 				avatar_webp_url: 'string',
// 				is_blocked: false,
// 				is_online: true,
// 				was_online_at: 0,
// 				is_in_contacts: true
// 			},
// 			is_favorite: true,
// 			notifications: true,
// 			new_message_count: 2,
// 			new_file_count: 0,
// 			name: 'asdf',
// 			chat_type: ChatType.CHAT,
// 			chat_key: 'string',
// 			last_activity_at: 0,
// 			last_seen_message: {
// 				id: 1,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
// 			},
// 			first_new_message: {
// 				id: 1,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
// 			},
// 			last_message: {
// 				id: 1,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				from_user: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				content: 'string',
// 				files_summary: {
// 					types: ['string', 'asdf'],
// 					count: 0
// 				},
// 				has_replied_message: false,
// 				has_forwarded_message: false,
// 				new: true,
// 				created_at: 0,
// 				updated_at: 0
// 			}
// 		},
// 		{
// 			id: 2,
// 			chat: {
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				username: 'Айрат123',
// 				nickname: 'Airat',
// 				first_name: 'Айрат',
// 				last_name: 'Хабибулаев',
// 				avatar: 'string',
// 				avatar_url:
// 					'https://interesnyefakty.org/wp-content/uploads/chto-takoe-avatar.jpg',
// 				avatar_webp: 'string',
// 				avatar_webp_url: 'string',
// 				is_blocked: false,
// 				is_online: true,
// 				was_online_at: 0,
// 				is_in_contacts: true
// 			},
// 			is_favorite: true,
// 			notifications: false,
// 			new_message_count: 2,
// 			new_file_count: 0,
// 			name: 'asdf',
// 			chat_type: ChatType.CHAT,
// 			chat_key: 'string',
// 			last_activity_at: 0,
// 			last_seen_message: {
// 				id: 0,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
// 			},
// 			first_new_message: {
// 				id: 0,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
// 			},
// 			last_message: {
// 				id: 0,
// 				uid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				from_user: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
// 				content:
// 					'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores mollitia voluptate sed vitae nobis, hic, officiis repellat voluptatem unde praesentium animi. Id omnis, est beatae totam vel ducimus laborum distinctio?',
// 				files_summary: {
// 					types: ['string'],
// 					count: 0
// 				},
// 				has_replied_message: true,
// 				has_forwarded_message: true,
// 				new: false,
// 				created_at: 0,
// 				updated_at: 0
// 			}
// 		}, [chatUid]);

// 	return (
// 		<Container type={ContainerType.WRAPPER}>
// 			<Container type={ContainerType.SIDEBAR}>
// 				<ChatList selectedChatUid={chatUid ?? null} />
// 			</Container>

// 			<Container type={ContainerType.CONTENT}>
// 				{chatUid ? (
// 					<ChatWidget chatUid={chatUid} />
// 				) : (
// 					<div className={cls.emptyState}>
// 						<NotMessage />
// 					</div>
// 				)}
// 			</Container>
// 		</Container>
// 	);
// };

// export const ChatsPage = memo(ChatsPageComponent);

// ChatsPage.displayName = 'ChatsPage';
