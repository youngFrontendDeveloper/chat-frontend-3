import type { ReactNode } from 'react';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import '@/app/styles/index.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ru'>
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
