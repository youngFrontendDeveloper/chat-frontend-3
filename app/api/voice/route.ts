import { exec } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

// !!! Нужно установить  ffmpeg !!!

function convertToOgg(input: string, output: string) {
	return new Promise((resolve, reject) => {
		exec(`ffmpeg -i "${input}" -c:a libopus -b:a 24k "${output}"`, error =>
			error ? reject(error) : resolve(true)
		);
	});
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get('voice') as File;

		if (!file) {
			return Response.json({ error: 'No file' }, { status: 400 });
		}

		const id = crypto.randomUUID();
		const tmpDir = os.tmpdir();

		const webmPath = path.join(tmpDir, `${id}.webm`);
		const oggPath = path.join(tmpDir, `${id}.ogg`);

		const buffer = Buffer.from(await file.arrayBuffer());

		fs.writeFileSync(webmPath, buffer);

		await convertToOgg(webmPath, oggPath);

		const oggBuffer = fs.readFileSync(oggPath);

		fs.unlinkSync(webmPath);
		fs.unlinkSync(oggPath);

		return Response.json({
			filename: `${id}.ogg`,
			base64: oggBuffer.toString('base64'),
			type: 'audio/ogg'
		});
	} catch (error) {
		console.error(error);

		return Response.json({ error: 'Voice conversion failed' }, { status: 500 });
	}
}
