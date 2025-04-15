
import { createConnection } from "$lib/db/mysql";


export async function load({ locals }) {
	let connection = await createConnection();

	const [inboxRows] = await connection.execute('select * from contacts;');



	return {
		user: locals.user,
        contacts : inboxRows

	};
}



export const actions = {
    deleteContact: async ({request}) => {
        const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();
		

		await connection.execute('delete from contacts where id = ?', [id]);
	}
};

