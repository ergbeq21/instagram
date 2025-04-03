import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	const connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');

	let [replyRows] = await connection.execute('select * from reply;');

	return {
		comments: rows,
		replys: replyRows,
		user: locals.user
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
		console.log(voteId);

		const connection = await createConnection();
		await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
	},
	likeComment: async ({ request }) => {
		const formData = await request.formData();
		const likeId = await formData.get('likeId');

		const connection = await createConnection();
		await connection.execute('UPDATE comments SET likes = likes + 1 WHERE id = ?', [likeId]);
	},
	likeReply: async ({ request }) => {
		const formData = await request.formData();
		const likeReplyID = await formData.get('replylikeId');

		const connection = await createConnection();
		await connection.execute('UPDATE reply set likes = likes + 1 where id = ?', [likeReplyID]);
	}
};
