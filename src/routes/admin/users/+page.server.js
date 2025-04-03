import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	let [userRows] = await connection.execute('select * from users;');

	return {
		user: locals.user,
		users: userRows
	};
}

export const actions = {
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();

		await connection.execute('delete from users where id = ?', [id]);
	}
};
