import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');
	let [replyRows] = await connection.execute('select * from reply;');

	return {
		comments: rows,
		replies: replyRows,
		user: locals.user
	};
}

export const actions = {
	deleteComment: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();
	
		const [rows] = await connection.execute('SELECT articles.id FROM comments JOIN articles ON comments.article_id = articles.id WHERE comments.id = ?', [id]);
		const article_id = rows[0].id;
	
		await connection.execute('delete from reply where comment_id = ?', [id]);
		await connection.execute('Delete from comments where id = ?', [id]);
	
		await connection.execute('update articles set comments = comments - 1 where id = ?', [article_id]);
	},
	deleteReply: async ({ request }) => {
		const formData = await request.formData();
		const replyId = formData.get('replyId');
		const connection = await createConnection();
		await connection.execute('delete from reply where id = ?', [replyId]);
	}
};
