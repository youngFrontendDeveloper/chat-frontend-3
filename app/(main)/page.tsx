import styles from './page.module.scss';

export default function MainPage() {
	return (
		<div className={styles.placeholder}>
			<div className={styles.title}>Выберите чат слева</div>
			<div className={styles.sub}>После клика по чату откроется диалог.</div>
		</div>
	);
}
