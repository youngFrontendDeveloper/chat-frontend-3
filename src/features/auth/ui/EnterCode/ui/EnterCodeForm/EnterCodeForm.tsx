'use client';

import { FormAuthItem, useSetAuthStep } from '@/features/auth';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { ButtonColor, ButtonTheme } from '@/shared/ui/Button/model/type';
import { Form } from '@/shared/ui/FormComponent/Form/ui/Form';
import { Modal } from '@/shared/ui/Modal';
import {
	FontWeight,
	Text,
	TextColor,
	TextSize,
	TextType
} from '@/shared/ui/Text';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
	handleErrorResponse,
	handleSuccessResponse,
	LoginCodeForm,
	submitCodeRequest
	// useSuccessResponse
} from '../..';
import { codeFormItems } from '../../model/const/codeFormItems';
import styles from './EnterCodeForm.module.scss';

interface EnterCodeFormProps {
	setTime: React.Dispatch<React.SetStateAction<number>>;
	phone_number?: string;
	// code_len?: number;
	is_filled: boolean;
	disabled: boolean;
	finishedTime: boolean;
	// setAttemptCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const EnterCodeForm = ({
	setTime,
	phone_number,
	// code_len,
	// is_filled,
	disabled,
	finishedTime
	// setAttemptCounter
}: EnterCodeFormProps) => {
	const [attemptsNumber, setAttemptsNumber] = useState(5);
	const { attemptCounter } = useAppSelector(state => state.auth);
	const [isModalOpen, setIsModalOpen] = useState(attemptCounter > 0);
	const setStep = useSetAuthStep();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const methods = useForm<LoginCodeForm>();
	const { handleSubmit, setError, clearErrors, reset } = methods;
	const code = useWatch({
		control: methods.control,
		name: 'code'
	});
	// const isModalOpen = attemptCounter > 0;
	const modalTitle = attemptCounter > 1 ? 'Лимит исчерпан' : '';
	const modalText = attemptCounter > 1 ? 'Попробуйте позднее' : '';
	const submittedRef = useRef(false);
	// console.log('attemptsNumber in EnterCodeForm', attemptsNumber);
	// console.log('attemptCounter in EnterCodeForm', attemptCounter);
	// console.log('is_filled', is_filled);

	const onSubmit = useCallback<SubmitHandler<LoginCodeForm>>(
		async ({ code }) => {
			try {
				if (!phone_number) {
					return;
				}

				// console.log(code);
				const res = await submitCodeRequest({ phone_number, code });

				// console.log(res);
				// console.log(res.errors);

				if (res?.success) {
					handleSuccessResponse(
						res.is_filled,
						setStep,
						router,
						dispatch
						// setAttemptCounter
					);
				} else if (!!res.errors) {
					await handleErrorResponse(
						attemptsNumber,
						attemptCounter,
						setAttemptsNumber,
						// setAttemptCounter,
						setTime,
						dispatch,
						setError
					);
				} else {
					setError('code', {
						message: 'Произошла непредвиденная ошибка'
					});
				}
			} catch (_) {
				setError('code', {
					message: 'Ошибка сети. Попробуйте позже.'
				});
			}
		},
		[
			phone_number,
			setStep,
			setTime,
			router,
			setError,
			attemptsNumber,
			dispatch,
			// setAttemptCounter,
			attemptCounter
		]
	);

	useEffect(() => {
		if (attemptCounter > 1) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsModalOpen(true);
		}
	}, [attemptCounter]);

	useEffect(() => {
		if (finishedTime) {
			clearErrors('code');
			reset({});
		}
	}, [finishedTime, setError]);

	useEffect(() => {
		if (code?.length === 5 && !submittedRef.current) {
			submittedRef.current = true;
			handleSubmit(onSubmit)();
		}

		if (code?.length !== 5) {
			submittedRef.current = false;
		}
	}, [code, handleSubmit, onSubmit]);

	// useEffect(() => {
	// 	if (attemptCounter > 0) {
	// 		setModalText('Лимит исчерпан');
	// 		setModalText('Попробуйте позднее');
	// 	}
	// }, [attemptCounter]);

	const onModalClose = () => {
		setIsModalOpen(false);
		// setAttemptCounter(0);
	};

	const handleClickSupport = () => {
		setStep('support');
		// setAttemptCounter(0);
	};

	return (
		<>
			<Form<LoginCodeForm>
				methods={methods}
				onSubmit={onSubmit}
				className={styles.form}
			>
				{codeFormItems.map(item => (
					<FormAuthItem
						key={item.name}
						type={item.type}
						name={item.name}
						label={item.label}
						// length={code_len}
						disabled={disabled}
						classNameParentInput={styles.codeInput}
					/>
				))}
			</Form>

			<Modal
				size='wide'
				isOpen={isModalOpen}
				onClose={onModalClose}
				className={styles.modal}
			>
				<Text
					type={TextType.TITLE}
					fontSize={TextSize.XL}
					fontWeight={FontWeight.MEDIUM}
					color={TextColor.BLACK}
					className={styles.modalTitle}
				>
					{modalTitle}
				</Text>
				<Text
					type={TextType.TEXT}
					fontSize={TextSize.L}
					fontWeight={FontWeight.REGULAR}
					color={TextColor.GRAY}
					className={styles.modalText}
				>
					{modalText}
				</Text>

				<Modal.Actions className={styles.actions}>
					<Button
						color={ButtonColor.PRIMARY}
						onClick={handleClickSupport}
						className={styles.btn}
						// btnRef={confirmBtnRef}
					>
						Обратиться в поддержку
					</Button>

					<Button
						color={ButtonColor.PRIMARY}
						onClick={onModalClose}
						className={styles.btn}
						theme={ButtonTheme.OUTLINE}
					>
						Назад
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
};
