import { createConnection } from '$lib/db/mysql';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';


export async function load({ locals }) {
    if (!locals.user) {
		redirect(302, '/login');
	}

	let connection = await createConnection();

    let [messRows] = await  connection.execute('select * from message;');



    
    return {
        user: locals.user,
        messages: messRows
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
                'SELECT id, username, email FROM users WHERE username = ?',
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
        
    },
    sendMessage: async ({ request }) => {
        const formData = await request.formData();
        const userID = formData.get('userID');
        const text = formData.get('text');
        const user2ID = formData.get('user2ID');
    
        const connection = await createConnection();
        try {
            await connection.execute(
                'INSERT INTO message (text, user_id, user2_id) VALUES (?, ?,?)',
                [text, userID,user2ID]
            );
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        } 
    } 
};
