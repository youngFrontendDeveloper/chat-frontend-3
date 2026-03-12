export async function convertVoice(blob: Blob) {
	const formData = new FormData();
	formData.append('voice', blob);

	const res = await fetch('/api/voice', {
		method: 'POST',
		body: formData
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('VOICE API ERROR:', text);

		throw new Error(`Voice convert failed: ${res.status}`);
	}

	return res.json() as Promise<{
		base64: string;
		filename: string;
		type: string;
	}>;
}
