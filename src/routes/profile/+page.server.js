
import { createConnection } from '$lib/db/mysql';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';



export async function load({ locals }) {

    const connection = await createConnection();
    return{
        user: locals.user

    }
}

export const actions = {
    changeInfo: async ({request}) =>{

        const connection = await createConnection();
        const formData = await request.formData();

        const bio = formData.get('bio');
        const user_id = formData.get('userID')

        const [result] = await connection.execute('update users set bio = ? where id = ?',[
            bio,
            user_id

        ])

        if (result.affectedRows) {
            redirect(303, '/');
        }
    
    }
}
