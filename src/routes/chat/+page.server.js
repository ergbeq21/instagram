// Import database connection, error and redirect
import { createConnection } from '$lib/db/mysql';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// Redirect to login page if user is not logged in
	if (!locals.user) {
		redirect(302, '/login');
	}

	// Connect to the database
	let connection = await createConnection();

	// Get all messages from the database
	let [messRows] = await connection.execute('select * from message;');

	// Return user info and messages
	return {
		user: locals.user,
		messages: messRows
	};
}

export const actions = {
	// Search for a user or send a message
	searchUser: async ({ request }) => {
		const formData = await request.formData();

		// If the "sendMessage" action is triggered
		if (formData.get('sendMessage')) {
			const userID = formData.get('userID');
			const text = formData.get('text');
			const user2ID = formData.get('user2ID');
			const username = formData.get('username');

			const connection = await createConnection();

			try {
				// Insert the message into the database
				await connection.execute('INSERT INTO message (text, user_id, user2_id) VALUES (?, ?, ?)', [
					text,
					userID,
					user2ID
				]);
			} catch (error) {
				console.error('Message send error:', error);
				return {
					error: 'Failed to send message'
				};
			}

			// Retrieve user info based on username
			let [rows] = await connection.execute(
				'SELECT id, username, email,image FROM users WHERE username = ?',
				[username]
			);

			return {
				userInfo: rows[0]
			};
		}

		// If "username" is provided, search for the user
		const username = formData.get('username');

		// Return an error if username is missing
		if (!username) {
			return {
				userInfo: null,
				error: 'Username is required'
			};
		}

		const connection = await createConnection();

		// Retrieve user details based on username
		let [rows] = await connection.execute(
			'SELECT id, image, username, email FROM users WHERE username = ?',
			[username]
		);

		// Return error if user is not found
		if (rows.length === 0) {
			return {
				userInfo: null,
				error: 'No user found'
			};
		}

	    // Return the found user information
		return {
			userInfo: rows[0]
		};
	},
	// Send a message to another user
	sendMessage: async ({ request }) => {
		const formData = await request.formData();
		const userID = formData.get('userID');
		const text = formData.get('text');
		const user2ID = formData.get('user2ID');

		// Connect to the database
		const connection = await createConnection();
		try {
			// Insert the message into the database
			await connection.execute('INSERT INTO message (text, user_id, user2_id) VALUES (?, ?,?)', [
				text,
				userID,
				user2ID
			]);
		} catch (error) {
			console.error('Database query error:', error);
			throw error;
		}
	},
	// Delete a message
	deleteYourMessage: async ({ request }) => {
		const formaData = await request.formData();
		const messageID = await formaData.get('messageID');

		const connection = await createConnection();

		// Delete the message by its ID
		await connection.execute('delete from message where id = ?', [messageID]);
	}
};
