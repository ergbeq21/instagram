// Import database connection
import { createConnection } from "$lib/db/mysql";


export async function load({ locals }) {
    // Connect to the database
	let connection = await createConnection();

    // Get all contact messages
	const [inboxRows] = await connection.execute('select * from contacts;');

    // Get all sent messages
    const [sentRows] = await connection.execute('select * from contactAnswer');


 	// Return user info, contacts, and sent messages
	return {
		user: locals.user,
        contacts : inboxRows,
        sents : sentRows

	};
}



export const actions = {
    // Delete a contact message from the inbox
    deleteContact: async ({request}) => {
        
        const formData = await request.formData();
		const id = formData.get('id');  // Get contact ID from the form
		const connection = await createConnection();
		// Delete the contact message by ID
		await connection.execute('delete from contacts where id = ?', [id]);
	},
    // Delete a sent contact answer
    deleteSent: async ({request}) => {
        const formData = await request.formData();
        const connection = await createConnection();
        const receivedID =  formData.get('id'); // Get sent message ID from the form
        // Delete the sent message by ID
        await connection.execute('delete from contactAnswer where id = ?',[receivedID]);
    }
};

