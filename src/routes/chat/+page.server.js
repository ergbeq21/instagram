import { createConnection } from '$lib/db/mysql';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
    return {
        user: locals.user
    };
}

export const actions = {
    searchUser: async ({ request }) => {
        const formData = await request.formData();
        let username = formData.get('username');

        if (!username) {
            return {
                userInfo: null,
                error: 'Username is required'
            };
        }

        const connection = await createConnection();

            let [rows] = await connection.execute(
                'SELECT username, email FROM users WHERE username = ?',
                [username]
            );

            if (rows.length === 0) {
                return {
                    userInfo: null,
                    error: 'No user found'
                };
            }

            return {
                userInfo: rows[0]
            };
        
    }
};
