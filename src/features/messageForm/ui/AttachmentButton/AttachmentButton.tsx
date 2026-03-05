import { Button, ButtonColor } from '@/shared/ui/Button';
import { Paperclip } from '@icons/index';
import styles from './AttachmentButton.module.scss';

export function AttachmentButton() {
	return (
		<Button color={ButtonColor.TRANSPARENT} className={styles.button}>
			<Paperclip className={styles.icon} />
		</Button>
	);
}
