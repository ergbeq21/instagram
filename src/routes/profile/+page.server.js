
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
    changeProfilePicture: async ({request}) =>{
        const formData = await request.formData();

        const connection = await createConnection();

        const image = formData.get('image');
        const userID = formData.get('userID')


        if (!image) {
            throw error(400, { message: 'No file to upload.' });
        }

        const { url } = await put('insta-images/' + image.name, image, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        const [result] = await connection.execute(
            'Update users set image = ? where id = ? ',
            [url, userID]
        );

        if (result.affectedRows) {
            redirect(303, '/');
        }

        return { uploaded: url };

    }
}
