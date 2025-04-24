import { createConnection } from '$lib/db/mysql'; // Import the createConnection function to interact with the database

export async function load({ locals }) {
	let connection = await createConnection();

    // Get all data from the favorites and upvotes tables
	const [favRows] = await connection.execute('select * from favorites;');
	const [upvoteRows] = await connection.execute('select * from upvotes');


    // Return the user data and the fetched rows for favorites and upvotes
	return {
		user: locals.user,
		favorites: favRows,
		upvotes: upvoteRows
	};
}

export const actions = {
	// This action adds an article to the user's favorites
	addFavorites: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const articleID = formData.get('articleID'); // Get the article ID from the form
		const userID = formData.get('userID'); // Get the user ID from the form

		// Insert the favorite into the favorites table
		await connection.execute('INSERT INTO favorites (user_id,article_id) VALUES (?, ?)', [
			userID,
			articleID
		]);
	},
	// This action removes an article from the user's favorites
	deleteFavorites: async ({ request }) => {
		let formData = await request.formData();
		const connection = await createConnection();

		const favID = formData.get('favID'); // Get the favorite ID from the form
		await connection.execute('delete from favorites where id = ? ', [favID]); // Delete the favorite from the database
	},
	// This action handles upvoting an article (increasing the vote count)
	upVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Increase the vote count of the article
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
		// Insert the upvote into the upvotes table
		await connection.execute('insert into upvotes (article_id,user_id) values (?,?)', [
			voteId,
			userID
		]);
	},
	downVote: async ({ request }) => {
		// This action handles downvoting an article (decreasing the vote count)
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Decrease the vote count of the article
		await connection.execute('UPDATE articles SET votes = votes - 1 WHERE id = ?', [voteId]);
		// Delete the upvote from the upvotes table (undo the upvote)
		await connection.execute('delete from upvotes where article_id = ? and user_id = ?', [
			voteId,
			userID
		]);
	}
};
