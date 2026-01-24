'use client';

import { useRouter } from 'next/navigation';

import { Container, ContainerType } from '@/shared/ui/Container';
import { Text, TextAlign, TextColor, TextSize } from '@/shared/ui/Text';

import { ChatListPanel } from '@/features/ChatList/ui/ChatListPanel/ChatListPanel';

import cls from './chats.module.scss';

const Chats = () => {
	const router = useRouter();

	return (
		<Container type={ContainerType.WRAPPER}>
			<Container type={ContainerType.SIDEBAR}>
				<div className={cls.left}>
					<ChatListPanel onSelectChat={uid => router.push(`/im/${uid}`)} />
				</div>
			</Container>

			<Container type={ContainerType.CONTENT}>
				<div className={cls.right}>
					<div className={cls.empty}>
						<Text
							color={TextColor.GRAY}
							fontSize={TextSize.L}
							textAlign={TextAlign.CENTER}
						>
							Выберите чат слева
						</Text>
					</div>
				</div>
			</Container>
		</Container>
	);
};

export default Chats;
