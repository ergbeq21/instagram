import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	const [articleRows] = await connection.execute('select * from articles;');
	const [favouritesRows] = await connection.execute('select * from favorites;');

	const [likeRows] = await connection.execute('select * from upvotes');

	return {
		user: locals.user,
		articles: articleRows,
		favorites: favouritesRows,
		upvotes: likeRows
	};
}

export const actions = {
	deleteFavorites: async ({ request }) => {
		const formData = await request.formData();
		const connection = await createConnection();

		const favID = formData.get('favID');
		await connection.execute('delete from favorites where id = ? ', [favID]);
	},
	upVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
		await connection.execute('insert into upvotes (article_id,user_id) values (?,?)', [
			voteId,
			userID
		]);
	},
	downVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		await connection.execute('UPDATE articles SET votes = votes - 1 WHERE id = ?', [voteId]);
		await connection.execute('delete from upvotes where article_id = ? and user_id = ?', [
			voteId,
			userID
		]);
	}
};
