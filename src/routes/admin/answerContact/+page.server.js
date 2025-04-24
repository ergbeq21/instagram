// Import the function to create a database connection
import { createConnection } from "$lib/db/mysql";

// Import the redirect function from SvelteKit
import { redirect } from "@sveltejs/kit";

export async function load({locals}){
    const connection = await createConnection();

    // Get all rows from the "contacts" table
    const [contactRows] = await connection.execute('select * from contacts;');

    return{
        user: locals.user,
        contacts: contactRows
    }
}


export const actions = {
    sendAnswer: async ({request}) =>{
        // Get a database connection
        const connection = await createConnection();
        // Get form data
        const formData = await request.formData();

        const text = formData.get('text');
        const contact_id = formData.get('contactId');

         // Insert the answer into the "contactAnswer" table
        const [result] = await connection.execute('insert into contactAnswer (text,contact_id) values (?,?)',[
            text,
            contact_id
            
        ])

        // If insert was successful, redirect to the inbox page
        if (result.affectedRows) {
            redirect(303, '/admin/inbox');
        }
    }
}