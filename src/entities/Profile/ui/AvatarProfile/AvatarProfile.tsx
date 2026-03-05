'use client';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery';
import { Avatar } from '@/shared/ui/Avatar';
import { AvatarUploader } from '@/shared/ui/AvatarEditor';
import { useAvatarUpload } from '@/shared/ui/AvatarEditor/model/lib/hooks/useAvatarUpload/useAvatarUpload';
import { AvatarUploaderRef } from '@/shared/ui/AvatarEditor/ui/AvatarUpLoader/AvatarUpLoader';
import {
	Button,
	ButtonColor,
	ButtonTheme,
	ButtonType
} from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { Text, TextSize, TextTag, TextType, TitleTag } from '@/shared/ui/Text';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ProfileSchema } from '../../model/types/ProfileSchema';
import { profileActions } from '../../model/slice/profileSlice';

import cls from './AvatarProfile.module.scss';

export function AvatarProfile() {
	const dispatch = useAppDispatch();
	const profile = useAppSelector(
		(state: { profile: ProfileSchema }) => state.profile
	);
	const isMobile = useMediaQuery();

	const [serverError, setServerError] = useState<string | null>(null);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
	const avatarUploaderRef = useRef<AvatarUploaderRef>(null);

	const avatarSize = isMobile ? 200 : 180;
	const avatarVariant = isMobile ? 'full' : 'card';

	const {
		upload: uploadAvatarFile,
		isUploading: isAvatarUploading,
		error: avatarError,
		clearError: clearAvatarError,
		avatarUrl: uploadedAvatarUrl
	} = useAvatarUpload();

	const currentAvatar = useMemo(() => {
		return avatarPreviewUrl || profile.avatar_url || null;
	}, [avatarPreviewUrl, profile.avatar_url]);

	useEffect(() => {
		if (
			uploadedAvatarUrl &&
			!isAvatarUploading &&
			uploadedAvatarUrl !== profile.avatar_url
		) {
			dispatch(profileActions.setAvatarUrl(uploadedAvatarUrl));
		}
	}, [uploadedAvatarUrl, isAvatarUploading, dispatch, profile.avatar_url]);

	// ==================== ХЕНДЛЕРЫ ====================
	const showErrorModal = useCallback((message: string) => {
		setServerError(message);
		setIsErrorModalOpen(true);
	}, []);

	const handleCloseErrorModal = useCallback(() => {
		setServerError(null);
		setIsErrorModalOpen(false);
		clearAvatarError?.();
	}, [clearAvatarError]);

	// Обработчик выбора файла
	const handleAvatarChange = useCallback(
		async (file: File) => {
			try {
				const preview = URL.createObjectURL(file);
				setAvatarPreviewUrl(preview);

				await uploadAvatarFile(file);

				setAvatarPreviewUrl(null);

				return () => URL.revokeObjectURL(preview);
			} catch (error) {
				// При ошибке — откат к значению из store
				setAvatarPreviewUrl(profile.avatar_url || null);
				showErrorModal('Не удалось загрузить аватар');
			}
		},
		[uploadAvatarFile, profile.avatar_url, showErrorModal]
	);

	// ==================== RENDER ====================
	return (
		<>
			<div className={cls.avatarContainer}>
				<div className={cls.avatarWrapper}>
					{isAvatarUploading ? (
						<div className={cls.loading}>
							<Loader width='40px' height='40px' />
							<Text className={cls.loadingText}>Загрузка аватара...</Text>
						</div>
					) : (
						<Avatar
							key={currentAvatar}
							size={avatarSize}
							src={currentAvatar || undefined}
							variant={avatarVariant}
							alt='Аватар пользователя'
						/>
					)}
				</div>

				{/* Кнопка загрузки */}
				<div className={cls.btnWrapper}>
					<AvatarUploader
						ref={avatarUploaderRef}
						onAvatarChange={handleAvatarChange}
					/>
					{!isAvatarUploading && (
						<Button
							theme={ButtonTheme.CLEAR}
							color={ButtonColor.PRIMARY}
							btnType={ButtonType.BUTTON}
							onClick={() => avatarUploaderRef.current?.openFilePicker()}
							disabled={isAvatarUploading}
							className={classNames(cls.uploadButton, {
								[cls.mobileUploadButton]: isMobile
							})}
						>
							{isMobile ? 'Изменить фото' : 'Выбрать фотографию'}
						</Button>
					)}
				</div>
			</div>

			{/* Модальное окно ошибки */}
			{isErrorModalOpen && (
				<Modal
					isOpen={isErrorModalOpen}
					onClose={handleCloseErrorModal}
					closeButton
					size='wide'
					borderRadius='8px'
				>
					<div className={cls.errorModalContent}>
						<Text type={TextType.TITLE} tag={TitleTag.H3} fontSize={TextSize.L}>
							Ошибка
						</Text>
						<Text type={TextType.TEXT} tag={TextTag.P} fontSize={TextSize.M}>
							{serverError || avatarError || 'Неизвестная ошибка'}
						</Text>
						<Button
							onClick={handleCloseErrorModal}
							color={ButtonColor.GREEN}
							className={cls.errorCloseBtn}
						>
							Закрыть
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
}
