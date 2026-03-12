import { MessagesPage } from '@/pages/Chats';

export default function page() {
	// Тестовые uid - потом подключить реальные
	const userUid = '2089f9d3-ea44-4d30-876a-ddf177fa352a'; //5555555555
	// const userUid = '54cdbe82-28aa-4abf-a69d-525d0ab4da93';  // 7777777777
	return <MessagesPage userUid={userUid} />;
}
