'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';

import { ChatList } from '@/features/ChatList/ui/ChatList/ChatList';
import { ChatListSearch } from '@/features/ChatList/ui/ChatListSearch/ChatListSearch';

import { DialogScreen } from '@/features/Dialog/ui/DialogScreen/DialogScreen';

import styles from './layout.module.scss';

export default function MainLayout({ children }: { children: ReactNode }) {
	const [activeChatUid, setActiveChatUid] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<StoreProvider>
			<div className={styles.app}>
				<div className={styles.frame}>
					<div className={styles.header}>
						<Header />
					</div>

					<div className={styles.shell}>
						<div className={styles.sidebar}>
							<Sidebar />
						</div>

						<div className={styles.left}>
							<div className={styles.search}>
								<ChatListSearch value={searchQuery} onChange={setSearchQuery} />
							</div>

							<div className={styles.list}>
								<ChatList
									searchQuery={searchQuery}
									activeChatUid={activeChatUid}
									onSelectChat={setActiveChatUid}
								/>
							</div>
						</div>

						<div className={styles.right}>
							{activeChatUid ? (
								<DialogScreen chatUid={activeChatUid} />
							) : (
								children
							)}
						</div>
					</div>
				</div>
			</div>
		</StoreProvider>
	);
}
