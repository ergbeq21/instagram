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
	// Get all users from the database
	let [userRows] = await connection.execute('select * from users;');
	// Return user info and the list of users
	return {
		user: locals.user,
		users: userRows
	};
}

export const actions = {
	// Delete a user from the database
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id'); // Get user ID from the form

		const connection = await createConnection();
		// Delete the user by ID
		await connection.execute('delete from users where id = ?', [id]);
	}
};
