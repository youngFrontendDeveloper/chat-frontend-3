export const blobToBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			const base64 = reader.result as string;
			const pureBase64 = base64.split(',')[1];

			resolve(pureBase64);
		};

		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
