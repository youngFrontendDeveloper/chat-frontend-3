'use client';

import { TimeLeft, useSetAuthStep } from '@/features/auth';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatPhone } from '@/shared/lib/formatPhone/formatPhone';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button';
import {
	ButtonColor,
	ButtonFontSize,
	ButtonTheme,
	ButtonType
} from '@/shared/ui/Button/model/type';
import {
	FontWeight,
	Text,
	TextAlign,
	TextColor,
	TextSize,
	TextTag,
	TextType
} from '@/shared/ui/Text';
import { useState } from 'react';
import { EnterCodeForm } from '..';
import styles from './EnterCode.module.scss';
import TooltipWrapper from './TooltipWrapper';

export const EnterCode = () => {
	const [time, setTime] = useState(60);
	const [finishedTime, setFinishedTime] = useState(false);
	const {
		phone_number,
		code_len,
		is_filled,
		isDisabledCodeAttempts: disabled
	} = useAppSelector(state => state.auth);
	const setStep = useSetAuthStep();
	const formattedPhone = formatPhone(phone_number);

	return (
		<div className={styles.loginCode}>
			<Text
				type={TextType.TEXT}
				tag={TextTag.P}
				fontSize={TextSize.L}
				fontWeight={FontWeight.REGULAR}
				textAlign={TextAlign.CENTER}
				color={TextColor.BLACK}
				className={styles.messageText}
			>
				Код подтверждения отправлен на следующий номер:
			</Text>
			<Text
				type={TextType.TEXT}
				tag={TextTag.P}
				fontSize={TextSize.L}
				fontWeight={FontWeight.MEDIUM}
				textAlign={TextAlign.CENTER}
				color={TextColor.BLACK}
				className={classNames(`${styles.phoneText} ${styles.boldText}`, {}, [])}
			>
				{formattedPhone}
			</Text>
			<TooltipWrapper />
			<EnterCodeForm
				setTime={setTime}
				phone_number={phone_number}
				code_len={code_len}
				is_filled={is_filled}
				disabled={disabled}
			/>
			{!finishedTime ? (
				<>
					<Text
						type={TextType.TEXT}
						tag={TextTag.P}
						fontWeight={FontWeight.MEDIUM}
						textAlign={TextAlign.CENTER}
						color={TextColor.GRAY}
						className={styles.timer}
					>
						Отправить новый код через &nbsp;
						<TimeLeft initialTime={time} setFinishedTime={setFinishedTime} />
					</Text>
				</>
			) : (
				<Button
					btnType={ButtonType.BUTTON}
					fontSize={ButtonFontSize.M}
					disabled={false}
					theme={ButtonTheme.CLEAR}
					color={ButtonColor.PRIMARY}
					className={styles.newCode}
					onClick={() => {
						setTime(60);
						setFinishedTime(false);
					}}
				>
					Отправить новый код
				</Button>
			)}
			<Button
				onClick={() => {
					setStep('support');
				}}
				btnType={ButtonType.BUTTON}
				theme={ButtonTheme.CLEAR}
				color={ButtonColor.PRIMARY}
				fontSize={ButtonFontSize.M}
				className={styles.btn}
			>
				Не приходит код?
			</Button>
		</div>
	);
};
