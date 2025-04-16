
import { createConnection } from "$lib/db/mysql";



export async function load({ locals }) {

    const connection = await createConnection();

    const [inboxReceived] = await connection.execute('select * from contactAnswer');
    const [inboxRows] = await connection.execute('select * from contacts');
    return{
        user: locals.user,
        contacts : inboxRows,
        messages : inboxReceived

    }
}


export const actions = {
    deleteMessageSent: async ({request}) => {
        const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();
		

		await connection.execute('delete from contacts where id = ?', [id]);
	},
    deleteMessageReceided: async ({request}) => {
        const formData = await request.formData();
        const connection = await createConnection();
        const receivedID =  formData.get('id');

        await connection.execute('delete from contactAnswer where id = ?',[receivedID]);
    }
};
