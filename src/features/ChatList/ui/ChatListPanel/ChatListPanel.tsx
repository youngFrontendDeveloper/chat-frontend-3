'use client';

import React, { useState } from 'react';
import { ChatList } from '../ChatList/ChatList';
import { ChatListSearch } from '@/features/ChatList/ui';

export function ChatListPanel() {
	const [searchQuery, setSearchQuery] = useState('');
	const [activeChatUid, setActiveChatUid] = useState<string | null>(null);

	return (
		<>
			<ChatListSearch value={searchQuery} onChange={setSearchQuery} />
			<ChatList
				searchQuery={searchQuery}
				activeChatUid={activeChatUid}
				onSelectChat={setActiveChatUid}
			/>
		</>
	);
}
