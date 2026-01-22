'use client';

import type { ReactNode } from 'react';
import React, { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Sidebar } from '@/widgets/Sidebar';
import { ChatList } from '@/features/ChatList/ui';
import { ChatListSearch } from '@/features/ChatList/ui/ChatListSearch/ChatListSearch';

import styles from './mainShell.module.scss';

export default function MainShell({ children }: { children: ReactNode }) {
	const params = useParams<{ chatUid?: string }>();
	const router = useRouter();

	const activeChatUid =
		typeof params?.chatUid === 'string' ? params.chatUid : null;

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = useCallback((value: string) => {
		setSearchQuery(value);
	}, []);

	const handleSelectChat = useCallback(
		(uid: string) => {
			router.push(`/im/${uid}`);
		},
		[router]
	);

	return (
		<div className={styles.shell}>
			<Sidebar />

			<div className={styles.left}>
				<div className={styles.search}>
					<ChatListSearch value={searchQuery} onChange={handleSearchChange} />
				</div>

				<div className={styles.list}>
					<ChatList
						searchQuery={searchQuery}
						activeChatUid={activeChatUid}
						onSelectChat={handleSelectChat}
					/>
				</div>
			</div>

			<div className={styles.right}>{children}</div>
		</div>
	);
}
