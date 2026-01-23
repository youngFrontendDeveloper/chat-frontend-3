'use client';

import React, { useState } from 'react';

import { ChatListSearch } from '@/features/ChatList/ui/ChatListSearch/ChatListSearch';
import { ChatList } from '@/features/ChatList/ui/ChatList/ChatList';
import { DialogScreen } from '@/features/Dialog/ui/DialogScreen/DialogScreen';

export default function PreviewImPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [activeChatUid, setActiveChatUid] = useState<string | null>('u-oleg');

	return (
		<div style={{ height: '100vh', display: 'flex', background: '#fff' }}>
			<div
				style={{
					width: 360,
					flex: '0 0 360px',
					background: '#F5F6F8',
					borderRight: '1px solid #e5e7eb',
					display: 'flex',
					flexDirection: 'column',
					minHeight: 0
				}}
			>
				<div style={{ padding: 16 }}>
					<ChatListSearch value={searchQuery} onChange={setSearchQuery} />
				</div>

				<div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
					{/* временно можно оставить onSelectChat, чтобы кликом менять правую часть */}
					<ChatList
						searchQuery={searchQuery}
						activeChatUid={activeChatUid}
						onSelectChat={setActiveChatUid}
					/>
				</div>
			</div>

			<div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
				{activeChatUid ? (
					<DialogScreen chatUid={activeChatUid} />
				) : (
					<div
						style={{ height: '100%', display: 'grid', placeItems: 'center' }}
					>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontWeight: 700, fontSize: 18 }}>
								Выберите чат слева
							</div>
							<div style={{ marginTop: 6, color: '#6b7280', fontSize: 14 }}>
								После клика по чату откроется диалог.
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
