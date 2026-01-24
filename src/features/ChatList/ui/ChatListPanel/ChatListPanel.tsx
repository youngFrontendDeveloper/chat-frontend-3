'use client';

import React, { useState } from 'react';

import { ChatList } from '../ChatList/ChatList';
import { ChatListSearch } from '../ChatListSearch/ChatListSearch';

import styles from './ChatListPanel.module.scss';

type Props = {
	activeChatUid?: string | null;
	onSelectChat?: (uid: string) => void;
};

export function ChatListPanel({ activeChatUid, onSelectChat }: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [localActiveUid, setLocalActiveUid] = useState<string | null>(null);

	const handleSelect = (uid: string) => {
		setLocalActiveUid(uid);
		onSelectChat?.(uid);
	};

	return (
		<div className={styles.panel}>
			<div className={styles.search}>
				<ChatListSearch value={searchQuery} onChange={setSearchQuery} />
			</div>

			<div className={styles.list}>
				<ChatList
					searchQuery={searchQuery}
					activeChatUid={activeChatUid ?? localActiveUid}
					onSelectChat={handleSelect}
				/>
			</div>
		</div>
	);
}
