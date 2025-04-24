// Import database connection and redirect

import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	// Get all articles from the database
	let [rows] = await connection.execute('select * from articles;');

	// Return articles and user info to the page
	return {
		articles: rows,
		user: locals.user
	};
}

export const actions = {
	// Handle deleting an article
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');  // Get the article ID from the form
		const connection = await createConnection();
		
		// Delete the article with the given ID
		await connection.execute('delete from articles where id = ?', [id]);
	}
};
