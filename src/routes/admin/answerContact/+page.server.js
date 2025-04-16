import { createConnection } from "$lib/db/mysql";

import { redirect } from "@sveltejs/kit";

export async function load({locals}){
    const connection = await createConnection();

    const [contactRows] = await connection.execute('select * from contacts;');

    return{
        user: locals.user,
        contacts: contactRows
    }
}


export const actions = {
    sendAnswer: async ({request}) =>{
        const connection = await createConnection();
        const formData = await request.formData();

        const text = formData.get('text');
        const contact_id = formData.get('contactId');

        const [result] = await connection.execute('insert into contactAnswer (text,contact_id) values (?,?)',[
            text,
            contact_id
            
        ])

        if (result.affectedRows) {
            redirect(303, '/admin/inbox');
        }
    }
}