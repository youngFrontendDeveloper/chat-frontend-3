import { Messages } from '@/entities/Messages';
import { MessageFormComponent } from '@/features/messageForm';
import MessageHeader from './MesageHeader';
import styles from './MessagesPage.module.scss';

export function MessagesPage({ userUid }: { userUid: string }) {
	return (
		<section className={styles.messagesPage}>
			<MessageHeader />
			<Messages />
			<MessageFormComponent userUid={userUid} />
		</section>
	);
}
