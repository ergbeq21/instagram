// websocket-server.js
import { createConnection } from '$lib/db/mysql';
const WebSocket = require('ws');

const connection = await createConnection();
const server = new WebSocket.Server({ port: 33060 });

server.on('connection', (socket) => {
	console.log('New WebSocket connection established');

	socket.on('message', async (message) => {
		console.log(`Received message: ${message}`);

		try {
			const parsedMessage = JSON.parse(message);
			await connection.execute('INSERT INTO message (text, user_id, user2_id) VALUES (?, ?, ?)', [
				parsedMessage.text,
				parsedMessage.userID,
				parsedMessage.user2ID
			]);

			let [rows] = await connection.execute('SELECT * FROM message');
			console.log('Database messages:', rows);

			server.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(rows));
				}
			});
		} catch (err) {
			console.error('Database query error:', err);
		}
	});
});

server.on('error', (err) => {
	console.error('WebSocket server error:', err);
});
