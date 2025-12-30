import type { ReactNode } from 'react';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';

import { Sidebar } from '@/widgets/Sidebar';
import { ChatList, ChatListSearch } from '@/features/ChatList/ui';

import '@/app/styles/index.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ru'>
			<body>
				{children}
				<StoreProvider>
					<div className='flex h-screen w-screen overflow-hidden'>
						<Sidebar />
						<div className='w-[350px] border-r border-gray-200 flex flex-col overflow-hidden bg-white'>
							<ChatListSearch />
							<ChatList />
						</div>
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
