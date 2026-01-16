import type { ReactNode } from 'react';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import '@/app/styles/index.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	icons: {
		icon: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }]
	}
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ru'>
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
