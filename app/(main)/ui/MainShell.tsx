'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { Sidebar } from '@/widgets/Sidebar';
import { ChatList } from '@/features/ChatList/ui';
import styles from './MainShell.module.scss';

export default function MainShell({ children }: { children: ReactNode }) {
	const params = useParams<{ chatUid?: string }>();
	const activeChatUid =
		typeof params?.chatUid === 'string' ? params.chatUid : null;

	const [searchQuery, setSearchQuery] = useState('');

	const onChange = useMemo(() => {
		return (value: string) => setSearchQuery(value);
	}, []);

	return (
		<div className={styles.shell}>
			<Sidebar />

			<div className={styles.left}>
				<div className={styles.search}>
					<input
						value={searchQuery}
						onChange={e => onChange(e.target.value)}
						className={styles.searchInput}
						placeholder='Поиск'
						type='text'
					/>
				</div>

				<div className={styles.list}>
					<ChatList
						searchQuery={searchQuery}
						activeChatUid={activeChatUid}
						onSelectChat={function (uid: string): void {
							throw new Error('Function not implemented.');
						}}
					/>
				</div>
			</div>

			<div className={styles.right}>{children}</div>
		</div>
	);
}
