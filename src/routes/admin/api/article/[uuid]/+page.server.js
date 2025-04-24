// Import function to connect to the database
import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	const connection = await createConnection();

	// Get all comments
	let [rows] = await connection.execute('select * from comments;');

	// Get all replies
	let [replyRows] = await connection.execute('select * from reply;');

	// Get all users
	let [userRows] = await connection.execute('select * from users');

	// Get all article upvotes
	let [upvoteRows] = await connection.execute('select * from upvotes');

	// Get all comment likes
	let [likeCommentRows] = await connection.execute('select * from commentLikes');

	// Get all reply likes
	let [likeReplyRows] = await connection.execute('select * from replylikes');

	// Send all data to the page
	return {
		comments: rows,
		replys: replyRows,
		users: userRows,
		user: locals.user,
		upvotes: upvoteRows,
		commentLikes: likeCommentRows,
		replyLikes: likeReplyRows
	};
}
export const actions = {
	// Write a new comment action	
	writeComment: async ({ request }) => {
		const formData = await request.formData();

		const name = await formData.get('name');
		const text = await formData.get('text');
		const article_id = await formData.get('articleID');

		const connection = await createConnection();

		// Add the comment to the database
		const [result] = await connection.execute(
			'INSERT INTO comments (name, text, article_id) VALUES (?, ?,?)',
			[name, text, article_id]
		);
		// Increase the comment count for the article
		await connection.execute('update articles set comments = comments + 1 where id = ?',[article_id]);
	},
	// Write a reply to a comment
	writeReply: async ({ request }) => {
		const formData = await request.formData();
		const name = await formData.get('nameReply');
		const text = await formData.get('textReply');
		const comment_id = await formData.get('commentID');
		const connection = await createConnection();

		// Add the reply to the database
		const [result] = await connection.execute(
			'insert into reply (name,text,comment_id) values (?,?,?)',
			[name, text, comment_id]
		);
	},
	// Upvote an article
	upVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Increase the vote count
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
		// Save the user's upvote
		await connection.execute('insert into upvotes (article_id,user_id) values (?,?)', [
			voteId,
			userID
		]);
	},
	// Remove an upvote (downvote)
	downVote: async ({ request }) => {
		const formData = await request.formData();
		const voteId = await formData.get('voteId');
		const userID = await formData.get('userID');
		console.log(voteId);

		const connection = await createConnection();
		// Decrease the vote count
		await connection.execute('UPDATE articles SET votes = votes - 1 WHERE id = ?', [voteId]);
		// Remove the user's upvote
		await connection.execute('delete from upvotes where article_id = ? and user_id = ?', [
			voteId,
			userID
		]);
	},
	// Like a comment
	likeComment: async ({ request }) => {
		const formData = await request.formData();
		const commentId = await formData.get('commentId');
		const userId = await formData.get('userId');

		const connection = await createConnection();
		// Increase likes for the comment
		await connection.execute('UPDATE comments SET likes = likes + 1 WHERE id = ?', [commentId]);
		// Save the like
		await connection.execute('insert into commentLikes (comment_id, user_id) values (?,?)', [
			commentId,
			userId
		]);
	},
	// Remove like from a comment
	removelikeComment: async ({ request }) => {
		const formData = await request.formData();
		const commentId = await formData.get('commentId');
		const userId = await formData.get('userId');

		const connection = await createConnection();

		// Decrease likes for the comment
		await connection.execute('UPDATE comments SET likes = likes - 1 WHERE id = ?', [commentId]);
		// Remove the like from the database
		await connection.execute('delete from commentLikes where comment_id = ? and user_id = ?', [
			commentId,
			userId
		]);
	},
	// Like a reply
	likeReply: async ({ request }) => {
		const formData = await request.formData();
		const replyID = await formData.get('replyId');
		const userID = await formData.get('userId');

		const connection = await createConnection();
		// Increase likes for the reply
		await connection.execute('UPDATE reply set likes = likes + 1 where id = ?', [replyID]);
		// Save the like
		await connection.execute('insert into replylikes (user_id,reply_id) values (?,?)', [
			userID,
			replyID
		]);
	},
	// Remove like from a reply
	removelikeReply: async ({ request }) => {
		const formData = await request.formData();
		const likeReplyID = await formData.get('replyId');
		const userID = await formData.get('userId');

		const connection = await createConnection();
		// Decrease likes for the reply
		await connection.execute('UPDATE reply set likes = likes - 1 where id = ?', [likeReplyID]);
		// Remove the like from the database
		await connection.execute('DELETE from replylikes where reply_id = ? and user_id = ?', [
			likeReplyID,
			userID
		]);
	}
};
