 
import { createConnection } from '$lib/db/mysql';  // Import to create a connection to the MySQL database
import { redirect } from '@sveltejs/kit'; // Import to redirect users after actions



export async function load({ locals }) {
    // Create a connection to the database
    const connection = await createConnection();

    // Return the user information 
    return{
        user: locals.user

    }
}

export const actions = {
    // Action to change a user's bio
    changeInfo: async ({request}) =>{

        const connection = await createConnection();
        const formData = await request.formData(); // Get form data submitted by the user

         // Get the bio and user ID from the form data
        const bio = formData.get('bio');
        const user_id = formData.get('userID')

         // Update the user's bio in the database
        const [result] = await connection.execute('update users set bio = ? where id = ?',[
            bio,
            user_id

        ])

         // If the update was successful, redirect the user to the homepage
        if (result.affectedRows) {
            redirect(303, '/');
        }
    
    }
}
