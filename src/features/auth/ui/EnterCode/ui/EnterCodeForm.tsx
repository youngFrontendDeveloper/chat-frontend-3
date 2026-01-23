'use client';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Form } from '@/shared/ui/FormComponent/Form/ui/Form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { LoginCodeForm } from '..';
import { formItems } from '../model/const/formItems';
import styles from './EnterCodeForm.module.scss';
import { authActions, FormAuthItem, useSetAuthStep } from '@/features/auth';

interface EnterCodeFormProps {
	setTime: (time: number) => void;
	phone_number?: string;
	code_len?: number;
	is_filled: boolean;
	disabled: boolean;
}

export const EnterCodeForm = ({
	setTime,
	phone_number,
	code_len,
	// is_filled,
	disabled
}: EnterCodeFormProps) => {
	const [attemptsNumber, setAttemptsNumber] = useState(5);
	const setStep = useSetAuthStep();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const methods = useForm<LoginCodeForm>();
	const { handleSubmit, setError } = methods;
	const code = useWatch({
		control: methods.control,
		name: 'code'
	});
	const submittedRef = useRef(false);
	// console.log('is_filled', is_filled);

	const onSubmit = useCallback<SubmitHandler<LoginCodeForm>>(
		async ({ code }) => {
			const response = await fetch('/api/auth/setTokens', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phone_number, code })
			});
			const res = await response.json();
			console.log('res in LoginCode', res);
			if (res.success) {
				if (res.is_filled) {
					setStep('greeting');
					router.push('/');
				} else {
					router.push('/'); // поменять на setStep('register'), когда сделаю регистрацию
					// setStep('register');
				}
			} else if (res.errors) {
				if (attemptsNumber === 1) {
					dispatch(authActions.disabledCodeAttempts(true));
					setTime(600);
					setError('code', {
						message: 'Слишком много неверных попыток.'
					});
				} else {
					setError('code', {
						message: `Код введен неверно. Осталось ${attemptsNumber - 1} попытки`
					});
				}
				setAttemptsNumber(prev => prev - 1);
			} else {
				setError('code', {
					message: `Неизвестная ошибка`
				});
			}
		},
		[phone_number, setStep, setTime, router, setError, attemptsNumber, dispatch]
	);

	useEffect(() => {
		if (!code_len) {
			return;
		}

		if (code?.length === code_len && !submittedRef.current) {
			submittedRef.current = true;
			handleSubmit(onSubmit)();
		}

		if (code?.length !== code_len) {
			submittedRef.current = false;
		}
	}, [code, handleSubmit, onSubmit, code_len]);

	useEffect(() => {
		if (attemptsNumber === 0 && disabled === true) {
			const timer = setTimeout(() => {
				dispatch(authActions.disabledCodeAttempts(false));
				setAttemptsNumber(5);
				setError('code', {
					message: ``
				});
			}, 25000); // 600000 - 10 минут
			return () => clearTimeout(timer);
		}
	}, [attemptsNumber, disabled, setError, dispatch]);

	return (
		<Form<LoginCodeForm>
			methods={methods}
			onSubmit={onSubmit}
			className={styles.form}
		>
			{formItems.map(item => (
				<FormAuthItem
					key={item.name}
					type={item.type}
					name={item.name}
					label={item.label}
					length={code_len}
					disabled={disabled}
					classNameParentInput={styles.codeInput}
					parentLabelClass={styles.formLabel}
				/>
			))}
		</Form>
	);
};
