import { BlackList } from '@/entities/BlackList';
import { SettingsHeaderBlock } from '@/entities/Settings';
import styles from './BlackListPage.module.scss';

export function BlackListPage() {
	return (
		<section className={styles.blackList}>
			<SettingsHeaderBlock
				title={'Черный список'}
				href={'/settings'}
				parentClass={styles.headerBlock}
			/>
			<div className={styles.content}>
				<BlackList />
			</div>
		</section>
	);
}
