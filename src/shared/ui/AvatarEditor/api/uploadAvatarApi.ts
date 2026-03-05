export interface UploadAvatarResponse {
	file: string;
	file_url: string;
}

export const uploadAvatar = async (
	file: File
): Promise<UploadAvatarResponse> => {
	const formData = new FormData();

	formData.append('file', file, file.name);

	const response = await fetch('/api/proxy/avatar', {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error('❌ Тело ошибки:', errorText);

		let errorMessage = `Upload failed with status ${response.status}`;

		try {
			const errorData = JSON.parse(errorText);

			errorMessage =
				errorData.file?.[0] ||
				errorData.detail ||
				errorData.message ||
				errorData.error ||
				errorMessage;
		} catch (e) {
			errorMessage = errorText || errorMessage;
		}

		throw new Error(errorMessage);
	}

	const data = await response.json();

	return data;
};
