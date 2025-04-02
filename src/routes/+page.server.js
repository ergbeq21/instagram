import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	return {
		user: locals.user
	};
}




export const actions = {
	addFavorites: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const articleID = formData.get('articleID');
		const userID = formData.get('userID');

		await connection.execute('INSERT INTO favorites (user_id,article_id) VALUES (?, ?)',[userID,articleID]);
	}
};