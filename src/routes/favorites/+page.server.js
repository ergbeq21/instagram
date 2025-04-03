import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	const [articleRows] = await connection.execute('select * from articles;');
	const [favouritesRows] = await connection.execute('select * from favorites;');

	return {
		user: locals.user,
		articles: articleRows,
		favorites: favouritesRows
	};
}

export const actions = {
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
