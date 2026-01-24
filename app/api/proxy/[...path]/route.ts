import { NextRequest, NextResponse } from 'next/server';

const handler = (request: NextRequest) => handleProxy(request);
export { handler as DELETE, handler as GET, handler as POST, handler as PUT };

const excludeHeaders = [
	'host',
	'connection',
	'content-length',
	'cookie',
	'accept-encoding',
	'set-cookie',
	'transfer-encoding',
	'content-encoding'
];

function joinUrl(base: string, path: string) {
	const b = base.endsWith('/') ? base.slice(0, -1) : base;
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${b}${p}`;
}

async function handleProxy(request: NextRequest): Promise<NextResponse> {
	const proxyPrefix = process.env.NEXT_PUBLIC_PROXY_PREFIX as string; // например: /api/proxy
	const baseApi = process.env.NEXT_PUBLIC_BASE_API as string; // например: http://host/api/v1

	const pathWithoutPrefix = request.nextUrl.pathname.replace(proxyPrefix, ''); // /chat/list или /chat/list/
	const normalizedPath = pathWithoutPrefix.endsWith('/')
		? pathWithoutPrefix.slice(0, -1)
		: pathWithoutPrefix;

	// бек ожидает trailing slash на DRF-подобных API
	const targetUrl = `${joinUrl(baseApi, normalizedPath)}/`;

	const accessToken = request.cookies.get('accessToken')?.value;

	const headers = new Headers();
	request.headers.forEach((value, key) => {
		if (!excludeHeaders.includes(key)) {
			headers.set(key, value);
		}
	});

	if (accessToken && !headers.has('Authorization')) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	}

	const body =
		request.method !== 'GET' && request.method !== 'HEAD'
			? await request.text()
			: undefined;

	try {
		const res = await fetch(targetUrl, {
			method: request.method,
			headers,
			body,
			redirect: 'follow'
		});

		const responseHeaders = new Headers(res.headers);
		excludeHeaders.forEach(h => responseHeaders.delete(h));

		return new NextResponse(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: responseHeaders
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Proxy error', error);
		}
		return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
	}
}
