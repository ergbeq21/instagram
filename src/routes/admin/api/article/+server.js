import { createConnection } from '$lib/db/mysql';

export async function GET({ params }) {
	const { uuid } = params;
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM articles order by votes desc limit 24');

	return new Response(JSON.stringify(rows), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
}
