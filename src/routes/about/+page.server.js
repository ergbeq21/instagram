
// Import the function to create a database connection
import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	// Wait for the database connection
	let connection = await createConnection();

	// returns local user
	return {
		user: locals.user
	};
}
