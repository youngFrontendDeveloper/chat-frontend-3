import '@/app/styles/index.scss';

interface IChildren {
	children: React.ReactNode;
}

export default function Layout({ children }: IChildren) {
	return (
		<html lang='ru'>
			<head></head>

			<body>
				<main className='main'>{children}</main>
			</body>
		</html>
	);
}
