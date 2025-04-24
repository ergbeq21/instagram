import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	// Fetching articles, favorites, and upvotes
	const [articleRows] = await connection.execute('select * from articles;');
	const [favouritesRows] = await connection.execute('select * from favorites;');

	const [likeRows] = await connection.execute('select * from upvotes');

	// Returning fetched data to the page
	return {
		user: locals.user,
		articles: articleRows,
		favorites: favouritesRows,
		upvotes: likeRows
	};
}

export const actions = {
	// This action deletes a favorite item
	deleteFavorites: async ({ request }) => {
		const formData = await request.formData(); // Get the form data
		const connection = await createConnection();

		const favID = formData.get('favID'); // Get the favorite ID to delete
		// Delete the favorite item from the database
		await connection.execute('delete from favorites where id = ? ', [favID]);
	},
	// This action upvotes an article
	upVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Increase the vote count for the article
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
		// Record the user's upvote in the database
		await connection.execute('insert into upvotes (article_id,user_id) values (?,?)', [
			voteId,
			userID
		]);
	},
	// This action downvotes an article
	downVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Decrease the vote count for the article
		await connection.execute('UPDATE articles SET votes = votes - 1 WHERE id = ?', [voteId]);
		// Remove the user's upvote record from the database
		await connection.execute('delete from upvotes where article_id = ? and user_id = ?', [
			voteId,
			userID
		]);
	}
};
