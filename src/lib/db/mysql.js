// Import MySQL with promise support
import mysql from 'mysql2/promise';

// Load database settings from environment variables
import { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } from '$env/static/private';

// Keep the connection in a variable
let connection = null;


/**
 * Create and return a MySQL connection.
 * If a connection already exists, return it.
 */
export function createConnection() {
	if (!connection) {
		connection = mysql.createConnection({
			host: DB_HOST,
			user: DB_USER,
			port: DB_PORT,
			password: DB_PASSWORD,
			database: DB_NAME
		});
	}
	return connection;
}

