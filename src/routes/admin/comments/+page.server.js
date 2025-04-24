// Import database connection and redirect function
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// Only allow admin users
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login'); // Redirect to login if not admin
	}

	// Connect to the database
	let connection = await createConnection();

	// Get all comments and replies from the database
	let [rows] = await connection.execute('select * from comments;');
	let [replyRows] = await connection.execute('select * from reply;');

	// Return comments, replies, and user info
	return {
		comments: rows,
		replies: replyRows,
		user: locals.user
	};
}

export const actions = {
    // Delete a comment and its replies
	deleteComment: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');  // Get comment ID from the form
		const connection = await createConnection();
	
		// Find the article ID related to this comment
		const [rows] = await connection.execute('SELECT articles.id FROM comments JOIN articles ON comments.article_id = articles.id WHERE comments.id = ?', [id]);
		const article_id = rows[0].id;

		await connection.execute('delete from reply where comment_id = ?', [id]);
		await connection.execute('Delete from comments where id = ?', [id]);
	
		// Decrease the comment count in the related article
		await connection.execute('update articles set comments = comments - 1 where id = ?', [article_id]);
	},
	// Delete a reply
	deleteReply: async ({ request }) => {
		const formData = await request.formData();
		const replyId = formData.get('replyId'); // Get reply ID from the form
		const connection = await createConnection();
		// Delete the reply
		await connection.execute('delete from reply where id = ?', [replyId]);
	}
};
