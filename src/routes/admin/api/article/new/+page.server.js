// Import database connection and other tools
import { createConnection } from '$lib/db/mysql';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// Only allow admin users
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login'); // If not admin, send to login
	}
}
export const actions = {
	// Handle form to create a new article
	createArticle: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		// Get form values
		const image = formData.get('image');
		const author = formData.get('author');
		const description = formData.get('description');

		// Check if image exists
		if (!image) {
			throw error(400, { message: 'No file to upload.' });
		}

		// Upload image to Vercel Blob storage
		const { url } = await put('insta-images/' + image.name, image, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

		// Save article info in the database
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, description, author]
		);
        // If insert is successful, go to the articles admin page
		if (result.affectedRows) {
			redirect(303, '/admin/api/article');
		}

		// Return the uploaded image URL
		return { uploaded: url };
	}
};
