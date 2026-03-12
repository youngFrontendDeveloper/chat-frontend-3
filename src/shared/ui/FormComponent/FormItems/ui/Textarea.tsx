'use client';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useEffect, useRef } from 'react';
import {
	FieldValues,
	Path,
	RegisterOptions,
	useController,
	useFormContext
} from 'react-hook-form';
import { FormItemAutocomplete } from '../model/types';
import styles from './styles.module.scss';

interface TextareaProps<TFormValues extends FieldValues> {
	name: Path<TFormValues>;
	rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
	placeholder?: string;
	autoComplete?: FormItemAutocomplete;
	disabled?: boolean;
	classNameTextarea?: string;
	height?: string | undefined;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	textareaRef?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea<TFormValues extends FieldValues>({
	name,
	rules = {
		required: 'Заполните это поле'
	},
	placeholder = '',
	disabled,
	classNameTextarea,
	height,
	onKeyDown,
	textareaRef
}: TextareaProps<TFormValues>) {
	const { register } = useFormContext<TFormValues>();
	const { fieldState } = useController({ name });
	const isError = !!fieldState.error;
	const internalRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref: registerRef, ...registerRest } = register(name, rules);

	const setRefs = (element: HTMLTextAreaElement | null) => {
		internalRef.current = element;
		registerRef(element);

		if (!textareaRef) {
			return;
		}

		if (typeof textareaRef === 'function') {
			textareaRef(element);
		} else if (textareaRef && 'current' in textareaRef) {
			// eslint-disable-next-line react-hooks/immutability
			textareaRef.current = element;
		}
	};

	useEffect(() => {
		const textarea = internalRef.current;
		if (textarea) {
			const autoResize = () => {
				textarea.style.height = height || '21px';
				textarea.style.height = textarea.scrollHeight + 'px';
			};

			autoResize(); // Устанавливаем высоту при загрузке
			textarea.addEventListener('input', autoResize);

			return () => textarea.removeEventListener('input', autoResize);
		}
	}, [height]);

	return (
		<textarea
			onKeyDown={onKeyDown}
			ref={setRefs}
			{...registerRest}
			id={name}
			placeholder={placeholder}
			autoComplete={FormItemAutocomplete.OFF}
			disabled={disabled}
			className={classNames(
				styles.textarea,
				{
					[styles.hasError]: isError,
					[styles.disabled]: disabled
				},
				[classNameTextarea]
			)}
			style={
				height
					? {
							minHeight: height
						}
					: {}
			}
		/>
	);
}
