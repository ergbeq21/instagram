// Import database connection and redirect
import { createConnection } from "$lib/db/mysql";
import { redirect } from "@sveltejs/kit";



export async function load({ locals }) {
    // Create a database connection
	let connection = await createConnection();

    // Return the user info 
	return {
		user: locals.user
	};
}


export const actions = {
    // Handle contact form submission
    contact: async ({request}) =>{
        const connection = await createConnection();
        let formData = await request.formData();

        // Get the form data (text, username, and topic) from the contact form
        const text = formData.get('text');
        const username = formData.get('username');
        const topic = formData.get('topic');

        // Insert the contact information into the "contacts" table in the database
        const [result] = await connection.execute('INSERT INTO contacts (topic, text, user_username) VALUES (?,?,?)', [
            topic,
			text,
            username
		]);

        // If the insert was successful, redirect the user to the homepage
        if (result.affectedRows) {
            redirect(303, '/');
        }
        
    }
}