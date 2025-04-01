import { createConnection } from '$lib/db/mysql';
import bcrypt from 'bcrypt';

export let login = async (email, password) => {
	let connection = await createConnection();

	// Find user with email
	let [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

	if (users.length === 0) {
		return null;
	}

	// Check password
	if (!(await bcrypt.compare(password, users[0].password_hash))) {
		return null;
	}

	// Create token
	const token = crypto.randomUUID();

	// Create expiration date (1 week)
	let expires = new Date();
	expires.setDate(expires.getDate() + 7);

	// Save tokenx`
	let [result] = await connection.execute(
		'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
		[token, expires, users[0].id]
	);
	if (result.affectedRows === 0) {
		return null;
	}

	// Return token
	return token;
};
