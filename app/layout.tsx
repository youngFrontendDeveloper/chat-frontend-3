import { OnlineChecker } from '@/app/providers/OnlineChecker';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';

interface IChildren {
	children: React.ReactNode;
}

import { Sidebar } from '@/widgets/Sidebar';
import { ChatList } from '@/widgets/ChatList';

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru'>
			<body>
				<StoreProvider>
					{/* ГЛАВНЫЙ КОНТЕЙНЕР: на всю высоту экрана, flex-row */}
					<div
						style={{
							display: 'flex',
							height: '100vh',
							width: '100vw',
							overflow: 'hidden'
						}}
					>
						<Sidebar />

						{/* 2. Список чатов */}
						<div
							style={{
								width: '350px',
								borderRight: '1px solid #e0e0e0',
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<ChatList />
						</div>
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
