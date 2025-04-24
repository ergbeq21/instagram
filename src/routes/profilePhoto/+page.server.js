
import { createConnection } from '$lib/db/mysql'; // Import to create a connection to the MySQL database
import { put } from '@vercel/blob';  // Import to upload files to Vercel's blob storage
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'; // Token for accessing the blob storage securely
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
     // Action to change a user's profile picture
    changeProfilePicture: async ({request}) =>{
        const formData = await request.formData();  // Get form data submitted by the user

        const connection = await createConnection();

        const image = formData.get('image');  // Get the uploaded image
        const userID = formData.get('userID');  // Get the user ID from the form

        // If no image is uploaded, throw an error
        if (!image) {
            throw error(400, { message: 'No file to upload.' });
        }

        // Upload the image to the blob storage and get the URL
        const { url } = await put('insta-images/' + image.name, image, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        // Update the user's profile picture URL in the database
        const [result] = await connection.execute(
            'Update users set image = ? where id = ? ',
            [url, userID]
        );

         // If the update is successful redirect the user to the homepage
        if (result.affectedRows) {
            redirect(303, '/');
        }

        return { uploaded: url };

    }
}
