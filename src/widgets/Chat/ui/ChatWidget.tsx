'use client';

import { memo, useMemo, useCallback } from 'react';
import { Text, TextSize } from '@/shared/ui/Text';
import { Button, ButtonColor, ButtonType } from '@/shared/ui/Button';
import cls from './ChatWidget.module.scss';

interface ChatWidgetProps {
	chatUid: string;
	onClose?: () => void;
}

const ChatWidgetComponent = ({ chatUid, onClose }: ChatWidgetProps) => {
	const containerClass = useMemo(() => cls.chatWidget, []);

	//  Мемоизируем обработчик, если он появится
	const handleClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	return (
		<div className={containerClass}>
			<div className={cls.header}>
				{/* <Text fontSize={TextSize.XL}>Диалог с {chatUid}</Text> */}
				{onClose && (
					<Button
						onClick={handleClose}
						color={ButtonColor.TRANSPARENT}
						btnType={ButtonType.BUTTON}
					>
						Закрыть
					</Button>
				)}
			</div>
			<Text fontSize={TextSize.M}>Скоро здесь появится переписка...</Text>
		</div>
	);
};

export const ChatWidget = memo(ChatWidgetComponent);
ChatWidget.displayName = 'ChatWidget';
