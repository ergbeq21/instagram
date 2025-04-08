import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	const connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');

	let [replyRows] = await connection.execute('select * from reply;');

	let [userRows] = await connection.execute('select * from users');

	let [upvoteRows] = await connection.execute('select * from upvotes');

	let [likeCommentRows] = await connection.execute('select * from commentLikes');

	let [likeReplyRows] = await connection.execute('select * from replylikes');

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
	writeComment: async ({ request }) => {
		const formData = await request.formData();

		const name = await formData.get('name');
		const text = await formData.get('text');
		const article_id = await formData.get('articleID');

		const connection = await createConnection();

		const [result] = await connection.execute(
			'INSERT INTO comments (name, text, article_id) VALUES (?, ?,?)',
			[name, text, article_id]
		);
	},
	writeReply: async ({ request }) => {
		const formData = await request.formData();
		const name = await formData.get('nameReply');
		const text = await formData.get('textReply');
		const comment_id = await formData.get('commentID');
		const connection = await createConnection();

		const [result] = await connection.execute(
			'insert into reply (name,text,comment_id) values (?,?,?)',
			[name, text, comment_id]
		);
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
	},
	likeComment: async ({ request }) => {
		const formData = await request.formData();
		const commentId = await formData.get('commentId');
		const userId = await formData.get('userId');

		const connection = await createConnection();
		await connection.execute('UPDATE comments SET likes = likes + 1 WHERE id = ?', [commentId]);
		await connection.execute('insert into commentLikes (comment_id, user_id) values (?,?)', [
			commentId,
			userId
		]);
	},
	removelikeComment: async ({ request }) => {
		const formData = await request.formData();
		const commentId = await formData.get('commentId');
		const userId = await formData.get('userId');

		const connection = await createConnection();
		await connection.execute('UPDATE comments SET likes = likes - 1 WHERE id = ?', [commentId]);
		await connection.execute('delete from commentLikes where comment_id = ? and user_id = ?', [
			commentId,
			userId
		]);
	},
	likeReply: async ({ request }) => {
		const formData = await request.formData();
		const replyID = await formData.get('replyId');
		const userID = await formData.get('userId');

		const connection = await createConnection();
		await connection.execute('UPDATE reply set likes = likes + 1 where id = ?', [replyID]);
		await connection.execute('insert into replylikes (user_id,reply_id) values (?,?)', [
			userID,
			replyID
		]);
	},
	removelikeReply: async ({ request }) => {
		const formData = await request.formData();
		const likeReplyID = await formData.get('replyId');
		const userID = await formData.get('userId');

		const connection = await createConnection();
		await connection.execute('UPDATE reply set likes = likes - 1 where id = ?', [likeReplyID]);
		await connection.execute('DELETE from replylikes where reply_id = ? and user_id = ?', [
			likeReplyID,
			userID
		]);
	}
};
