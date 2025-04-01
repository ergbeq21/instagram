import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');

	return {
		comments: rows
	};
}


export const actions = {
    deleteComment: async ({request}) =>{
        const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();

		try {
			await connection.execute('Delete from comments where id = ?', [id]);
		} catch (e) {
			console.error(e);
			return {
				success: false,
				message: 'Delete not possible!'
			};
		}
    }
}