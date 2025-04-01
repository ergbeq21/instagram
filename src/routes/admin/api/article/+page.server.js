import { createConnection } from '$lib/db/mysql';

import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	let connection = await createConnection();

	let [rows] = await connection.execute('select * from articles;');

	return {
		articles: rows,
	};
}


export const actions = {
    deleteArticle: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const connection = await createConnection();
        const [comments] = await connection.execute('select id from comments where article_id = ?', [id]);
        

        if (comments.length > 0) {
            const commentIds = comments.map(comment => comment.id);
            const placeholders = commentIds.map(() => '?').join(',');
            await connection.execute(`delete from reply where comment_id IN (${placeholders})`, 
                commentIds
            );
            await connection.execute('delete from comments where article_id = ?', [id]);
        }

        await connection.execute('delete from articles where id = ?', [id]);
    }
};
