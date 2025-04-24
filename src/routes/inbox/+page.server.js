
import { createConnection } from "$lib/db/mysql";



export async function load({ locals }) {

    const connection = await createConnection();

    // Get all received messages from the 'contactAnswer' table
    const [inboxReceived] = await connection.execute('select * from contactAnswer');
    // Get all contacts from the 'contacts' table
    const [inboxRows] = await connection.execute('select * from contacts');
    // Return the data to the page (contacts, received messages, and the user info)
    return{
        user: locals.user,
        contacts : inboxRows,
        messages : inboxReceived

    }
}


export const actions = {
    // This action deletes a sent message (from 'contacts' table)
    deleteMessageSent: async ({request}) => {
        const formData = await request.formData();
         // Get the ID of the message to be deleted
		const id = formData.get('id');
		const connection = await createConnection();
		

         // Delete the sent message from the 'contacts' table
		await connection.execute('delete from contacts where id = ?', [id]);
	},
     // This action deletes a received message (from 'contactAnswer' table)
    deleteMessageReceided: async ({request}) => {
        const formData = await request.formData();
        const connection = await createConnection();
        // Get the ID of the received message to be deleted
        const receivedID =  formData.get('id');

        // Delete the received message from the 'contactAnswer' table
        await connection.execute('delete from contactAnswer where id = ?',[receivedID]);
    }
};
