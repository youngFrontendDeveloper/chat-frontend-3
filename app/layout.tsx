import { OnlineChecker } from '@/app/providers/OnlineChecker';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import type { Metadata } from 'next';
import { roboto, sfPro } from '../public/assets/fonts/index';

export const metadata: Metadata = {
	title: 'Мессенджер | А-Чат',
	keywords:
		'Удобный мессенджер, А-Чат, мессенджер А-Чат, мессенджер для связи, мессенджер для работы, мессенджер для общения',
	description: 'Мессенджер на все случаи жизни| А-Чат'
};

interface IChildren {
	children: React.ReactNode;
}

export default function RootLayout({ children }: IChildren) {
	return (
		<html lang='ru' className={`${roboto.variable} ${sfPro.variable} `}>
			<head></head>
			<body>
				<StoreProvider>
					<OnlineChecker>
						<main>{children}</main>
					</OnlineChecker>
				</StoreProvider>
			</body>
		</html>
	);
}
