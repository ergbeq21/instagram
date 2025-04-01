import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {

	const connection = await createConnection();

	let [rows] = await connection.execute('select * from comments;');

	return {
		comments: rows
	};
}
export const actions = {
	writeComment: async ({ request }) => {
		const formData = await request.formData();

		const name = await formData.get('name');
		const text = await formData.get('text');
		const article_id = await formData.get('articleID')

		const connection = await createConnection();

		const [result] = await connection.execute('INSERT INTO comments (name, text, article_id) VALUES (?, ?,?)', [
			name,
			text,
			article_id
		]);
	},
    upVote: async ({ request }) => {
        const formData = await request.formData();
        const voteId = await formData.get('voteId');
        console.log(voteId);

        const connection = await createConnection();
        await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [voteId]);
    },
	likeComment: async ({ request }) =>{
		const formData = await request.formData();
		const likeId = await formData.get('likeId');
		
		const connection = await createConnection();
		await connection.execute('UPDATE comments SET likes = likes + 1 where id = ?',[likeId]);

	}
};
