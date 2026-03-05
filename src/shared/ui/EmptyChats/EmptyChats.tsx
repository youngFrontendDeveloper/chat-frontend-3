import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Text, TextAlign, TextColor, TextSize } from '../Text';
import { Button, ButtonColor, ButtonTheme, ButtonType } from '../Button';
import cls from './EmptyChats.module.scss';

const EmptyChats = () => {
	const router = useRouter();

	const handleStartChat = useCallback(() => {
		router.push('/contacts');
	}, [router]);

	return (
		<div className={cls.wrapper}>
			<div className={cls.infoBlock}>
				<Image
					src='/images/png/empty_chats.png'
					alt='Нет чатов'
					width={200}
					height={200}
				/>
				<div className={cls.text}>
					<Text
						color={TextColor.GRAY}
						fontSize={TextSize.L}
						textAlign={TextAlign.CENTER}
					>
						У вас пока нет чатов
					</Text>
					<Text
						color={TextColor.GRAY}
						fontSize={TextSize.S}
						textAlign={TextAlign.CENTER}
					>
						Начните общение и здесь всё появится
					</Text>
				</div>
			</div>
			<Button
				onClick={handleStartChat}
				ariaLabel='Начать новый чат'
				theme={ButtonTheme.BACKGROUND}
				btnType={ButtonType.BUTTON}
				color={ButtonColor.PRIMARY}
				className={cls.btn}
			>
				Начать чат
			</Button>
		</div>
	);
};

export default EmptyChats;
