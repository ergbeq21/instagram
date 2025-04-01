import { createConnection } from '$lib/db/mysql';
import { format } from 'mysql2';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	createArticle: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const image = formData.get('image');
		const author = formData.get('author');
		const description = formData.get('description');

		if (!image) {
			throw error(400, { message: 'No file to upload.' });
		}

		const { url } = await put('insta-images/' + image.name, image, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, description, author]
		);

		if (result.affectedRows) {
			redirect(303, '/admin/api/article');
		}

		return { uploaded: url };
	}
};
