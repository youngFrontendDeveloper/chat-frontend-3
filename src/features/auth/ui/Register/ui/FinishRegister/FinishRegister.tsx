import { Text, TextType, TitleTag } from '@/shared/ui/Text';
import { Check, Logo } from '@icons/index';
import Link from 'next/link';
import styles from './FinishRegister.module.scss';
import { useSetAuthStep } from '@/features/auth';

export function FinishRegister() {
	const setStep = useSetAuthStep();
	return (
		<div className={styles.finishRegister}>
			<Logo className={styles.logo} />
			<div className={styles.success}>
				<Check className={styles.checkIcon} />
			</div>
			<Text type={TextType.TITLE} tag={TitleTag.H1} className={styles.title}>
				Поздравляем!
			</Text>
			<Text type={TextType.TEXT} className={styles.text}>
				Регистрация прошла успешно!
			</Text>
			<Link
				href='/'
				className={styles.link}
				onClick={() => setStep('greeting')}
			>
				Далее
			</Link>
		</div>
	);
}
