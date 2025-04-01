import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');
	let [ replyRows ] = await connection.execute('select * from reply;'); 

	return {
		comments: rows,
		replies: replyRows
	};
}


export const actions = {
    deleteComment: async ({request}) =>{
        const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();

		//await connection.execute('update reply set comment_id = null where comment_id = ?',[id]);
		await connection.execute('delete from reply where comment_id = ? ',[id]);

		await connection.execute('Delete from comments where id = ?', [id]);
		
   },
   deleteReply: async ({ request }) =>{
	const formData = await request.formData();
	const replyId = formData.get('replyId');
	const connection = await createConnection();
	await connection.execute('delete from reply where id = ?',[replyId]);
   }
}