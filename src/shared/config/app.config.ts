export const appConfig = {
	USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true',
	API: {
		BASE_URL: process.env.NEXT_PUBLIC_USE_MOCKS || ''
	}
} as const;
