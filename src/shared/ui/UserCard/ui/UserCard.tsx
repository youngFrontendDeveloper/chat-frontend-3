'use client';
import { ChatType } from '@/entities/Chat';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar/';
import {
	FontWeight,
	Text,
	TextAlign,
	TextClamp,
	TextColor,
	TextSize,
	TextTag,
	TextType,
	TitleTag
} from '@/shared/ui/Text';
import { SentRead, SentTime, Trash, VolumeOff, VolumeOn } from '@icons/index';
import { ReactNode } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '../../Button';
import { LastSeen } from '../../LastSeen';
import { AVATAR_SIZE, IUserCard, UserCardType } from '../model/types/IUserCard';
import cls from './UserCard.module.scss';

interface UserCardProps {
	className?: string;
	userData?: IUserCard;
	type: UserCardType;
	sendingMessage?: boolean;
	onDelete?: () => void;
}

const formatUnreadCount = (count: number | undefined): string => {
	if (count) {
		if (count < 1000) {
			return count.toString();
		}

		const thousands = count / 1000;
		return thousands % 1 === 0
			? `${Math.floor(thousands)}К`
			: `${thousands.toFixed(1).replace('.', ',')}К`;
	}
	return '';
};

const NOTIFICATION_OFF = (
	<div className={cls.notification}>
		<VolumeOff className={cls.volumeIcon} />
	</div>
);

const NOTIFICATION_ON = (
	<div className={cls.notification}>
		<VolumeOn className={cls.volumeIcon} />
	</div>
);

const renderNotifications = (
	type: UserCardType,
	notification: IUserCard['notifications'],
	chatType: IUserCard['chat_type']
): ReactNode | null => {
	if (type === UserCardType.CHAT) {
		if (!notification) {
			return NOTIFICATION_OFF;
		} else if (chatType !== ChatType.CHAT) {
			return NOTIFICATION_ON;
		}
	}
};

export const UserCard = ({
	className,
	userData,
	type,
	sendingMessage,
	onDelete
}: UserCardProps) => {
	if (!userData) {
		return null;
	}

	return (
		<div className={classNames(cls.userCard, {}, [className, cls[type]])}>
			<Avatar
				className={cls.avatar}
				alt={userData.user?.username}
				src={userData.user?.avatar_url}
				size={AVATAR_SIZE[type]}
				variant='card'
			/>

			<div className={cls.info}>
				<div className={cls.header}>
					<div className={cls.leftHeader}>
						<Text
							color={TextColor.BLACK}
							fontSize={TextSize.L}
							fontWeight={FontWeight.MEDIUM}
							tag={TitleTag.H3}
							type={TextType.TITLE}
							truncate
							className={cls.name}
						>
							{userData.user?.first_name} {userData.user?.last_name}
						</Text>
						{renderNotifications(
							type,
							userData.notifications,
							userData.chat_type
						)}
					</div>

					{/* rightHeader только для чатов */}
					{type === UserCardType.CHAT && (
						<div className={cls.rightHeader}>
							<div className={cls.status}>
								{sendingMessage ? <SentTime /> : <SentRead />}
							</div>

							<Text
								color={TextColor.GRAY}
								fontSize={TextSize.S}
								fontWeight={FontWeight.REGULAR}
								tag={TextTag.SPAN}
								className={cls.time}
							>
								21:49
							</Text>
						</div>
					)}
				</div>

				{/* только для профиля */}
				{type === UserCardType.PROFILE && (
					<Text
						className={cls.phone}
						fontSize={TextSize.M}
						fontWeight={FontWeight.REGULAR}
						color={TextColor.BLACK}
					>
						{userData.user?.phone}
					</Text>
				)}

				<div className={cls.footer}>
					{/* для чатов */}
					{type === UserCardType.CHAT && (
						<>
							<Text
								className={cls.lastMes}
								color={TextColor.GRAY}
								fontSize={TextSize.S}
								fontWeight={FontWeight.REGULAR}
								textAlign={TextAlign.LEFT}
								maxLines={TextClamp.LINES_2}
							>
								{userData.last_message?.content}
							</Text>

							{userData.last_message?.new && (
								<Text
									className={cls.newMesCount}
									fontSize={TextSize.M}
									color={TextColor.WHITE}
									fontWeight={FontWeight.REGULAR}
									tag={TextTag.SPAN}
								>
									{formatUnreadCount(userData.new_message_count)}
								</Text>
							)}
						</>
					)}
					{/* для контактов и черного списка */}
					{[UserCardType.CONTACT, UserCardType.BLACK_LIST].includes(type) && (
						<LastSeen
							wasOnlineAt={userData.user?.was_online_at || null}
							isOnline={userData.user?.is_online || null}
						></LastSeen>
					)}

					{/* для профиля */}
					{type === UserCardType.PROFILE && (
						<Text
							className={cls.nickname}
							fontSize={TextSize.M}
							fontWeight={FontWeight.REGULAR}
							color={TextColor.BLACK}
						>
							{userData.user?.nickname}
						</Text>
					)}
				</div>
			</div>

			{/* кнопка удаления для чс */}
			{type === UserCardType.BLACK_LIST && (
				<Button
					theme={ButtonTheme.CIRCLE}
					color={ButtonColor.TRANSPARENT}
					size={ButtonSize.S}
					className={cls.trashBtn}
					onClick={onDelete}
				>
					<Trash className={cls.trashIcon} />
				</Button>
			)}
		</div>
	);
};
