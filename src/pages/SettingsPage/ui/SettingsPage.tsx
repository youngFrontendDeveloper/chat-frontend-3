'use client';
import { useState, useRef } from 'react';
import { useDeleteProfileMutation } from '@/entities/Profile';
import { SettingsHeaderBlock } from '@/entities/Settings';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useLogout } from '@/shared/lib/hooks/useLogout/useLogout';
import {
	Button,
	ButtonColor,
	ButtonSize,
	ButtonTheme
} from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { SettingsList } from '@/shared/ui/SettingsList';
import { Text, TextColor, TextSize, TextType } from '@/shared/ui/Text';
import {
	mapProfileToUserCard,
	UserCard,
	UserCardType
} from '@/shared/ui/UserCard';
import { Trash } from '@icons/index';
import cls from './SettingsPage.module.scss';

export const SettingsPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const profile = useAppSelector(state => state.profile);

	const [deleteProfile, { isLoading, error }] = useDeleteProfileMutation();
	const logout = useLogout();

	const handleDelete = async () => {
		try {
			await deleteProfile(undefined).unwrap();
			logout();
		} catch (_) {}
	};

	return (
		<div className={cls.settings} ref={containerRef}>
			<SettingsHeaderBlock title={'Настройки'} />

			<div className={cls.content}>
				{profile ? (
					<UserCard
						userData={mapProfileToUserCard(profile)}
						type={UserCardType.PROFILE}
					/>
				) : null}

				<SettingsList />
			</div>

			<Button
				theme={ButtonTheme.CLEAR}
				color={ButtonColor.DANGER}
				className={cls.deleteProfile}
				onClick={() => setIsOpen(true)}
			>
				<Trash /> Удалить профиль
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				size='wide'
				className={classNames(cls.modal)}
			>
				<Text
					type={TextType.TITLE}
					fontSize={TextSize.L}
					className={cls.modalTitle}
				>
					Удаление профиля
				</Text>

				<Text fontSize={TextSize.M} className={cls.modalText}>
					Это действие необратимо. Все данные будут удалены без возможности
					восстановления.
				</Text>

				{error && (
					<Text color={TextColor.ERROR} className={cls.modalError}>
						Произошла ошибка при попытке удалить профиль
					</Text>
				)}

				<Modal.Actions>
					<Button
						onClick={handleDelete}
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.S}
						color={ButtonColor.DANGER}
						disabled={isLoading}
					>
						{isLoading ? 'Удаление...' : 'Удалить'}
					</Button>
					<Button
						color={ButtonColor.PRIMARY}
						onClick={() => setIsOpen(false)}
						size={ButtonSize.S}
					>
						Отмена
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};
