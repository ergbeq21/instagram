import { createConnection } from '$lib/db/mysql'; // Import to create a connection to the MySQL database

export async function load({ locals }) {
	let connection = await createConnection();

	// return user information
	return {
		user: locals.user
	};
}
