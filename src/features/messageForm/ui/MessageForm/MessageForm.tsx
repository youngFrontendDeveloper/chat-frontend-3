'use client';

import {
	connectChat,
	subscribeWS
} from '@/shared/api/WS/services/socketClient/socketClient';
import { Button, ButtonColor, ButtonType } from '@/shared/ui/Button';
import { Form, Textarea } from '@/shared/ui/FormComponent';
import { SendIcon } from '@icons/index';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageFormTypes } from '../../model/types/types';
import { EmojiPickerComponent } from '../EmojiPickerComponent/EmojiPickerComponent';
import styles from './MessageForm.module.scss';

interface MessageFormProps {
	onSendContent: (message: string) => void;
	filledField: boolean;
	setFilledField: (filledField: boolean) => void;
}

export function MessageForm({
	onSendContent,
	filledField,
	setFilledField
}: MessageFormProps) {
	const [messages, setMessages] = useState([]);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const methods = useForm<MessageFormTypes>({
		defaultValues: {
			message: ''
		}
	});
	const { setValue, getValues, handleSubmit, reset, watch } = methods;
	const message = watch('message');

	useEffect(() => {
		setFilledField(message !== '');
	}, [message, setFilledField]);

	// Отмена переноса на следующую строку при Enter,  при Shift+Enter оставляем стандартное поведение (перевод строки)
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(onSubmit)();
		}
	};

	const onEmojiSelect = (emoji: string) => {
		const textarea = textareaRef.current;
		if (!textarea) {
			return;
		}

		const startTextSelection = textarea.selectionStart;
		const endTextSelection = textarea.selectionEnd;

		const currentMessage = getValues('message');

		const newMessage =
			currentMessage.slice(0, startTextSelection) +
			emoji +
			currentMessage.slice(endTextSelection);

		setValue('message', newMessage, {
			shouldDirty: true,
			shouldTouch: true
		});

		// Ставим курсор после emoji
		requestAnimationFrame(() => {
			const cursor = startTextSelection + emoji.length;

			textarea.selectionStart = cursor;
			textarea.selectionEnd = cursor;
			textarea.focus();
		});
	};

	// Подключаемся к чату
	useEffect(() => {
		connectChat();
	}, []);

	const onSubmit = async (data: MessageFormTypes) => {
		const trimedMessage = data.message.trim();
		if (!trimedMessage) {
			return;
		}
		setFilledField(true);
		await onSendContent(trimedMessage);
		reset();
		// сбрасываем высоту Textarea до дефолтной
		if (textareaRef.current) {
			textareaRef.current.style.height = '21px';
		}
	};

	return (
		<Form<MessageFormTypes>
			methods={methods}
			onSubmit={onSubmit}
			className={styles.messageForm}
		>
			<div className={styles.textareaWrapper}>
				<Textarea
					name={'message'}
					classNameTextarea={styles.textarea}
					height={'21px'}
					onKeyDown={handleKeyDown}
					textareaRef={textareaRef}
					placeholder={'Сообщение...'}
				/>
				<EmojiPickerComponent onEmojiSelect={onEmojiSelect} />
			</div>
			{filledField && (
				<Button
					btnType={ButtonType.SUBMIT}
					color={ButtonColor.TRANSPARENT}
					className={styles.button}
					aria-label='Отправить сообщение'
				>
					<SendIcon width={36} height={36} />
				</Button>
			)}
		</Form>
	);
}
