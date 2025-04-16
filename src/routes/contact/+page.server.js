import { createConnection } from "$lib/db/mysql";
import { redirect } from "@sveltejs/kit";



export async function load({ locals }) {
	let connection = await createConnection();

	return {
		user: locals.user
	};
}


export const actions = {
    contact: async ({request}) =>{
        const connection = await createConnection();
        let formData = await request.formData();

        const text = formData.get('text');
        const username = formData.get('username');
        const topic = formData.get('topic');

        const [result] = await connection.execute('INSERT INTO contacts (topic, text, user_username) VALUES (?,?,?)', [
            topic,
			text,
            username
		]);

        if (result.affectedRows) {
            redirect(303, '/');
        }
        
    }
}