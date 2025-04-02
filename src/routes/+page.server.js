import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	const [favRows] = await connection.execute('select * from favorites;');

	return {
		user: locals.user,
		favorites: favRows
	};
}

export const actions = {
	addFavorites: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const articleID = formData.get('articleID');
		const userID = formData.get('userID');

		await connection.execute('INSERT INTO favorites (user_id,article_id) VALUES (?, ?)', [
			userID,
			articleID
		]);
	},
	deleteFavorites: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const favID = formData.get('favID');
		await connection.execute('delete from favorites where id = ? ', [favID]);
	},
	upVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		console.log(voteId);

		const connection = await createConnection();
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
	}
};
