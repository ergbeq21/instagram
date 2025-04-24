import { createConnection } from '$lib/db/mysql'; // Import to create a connection to the MySQL database
import { format } from 'mysql2';
import { error } from '@sveltejs/kit'; // Import to throw errors if something goes wrong
import { put } from '@vercel/blob';  // Import to upload images to Vercel's blob storage
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'; // Token for accessing the blob storage securely
import { redirect } from '@sveltejs/kit';  // Import to redirect users after actions

export async function load({ locals }) {

    // Create a connection to the database
    const connection = await createConnection();

    // Get the articles from the database, ordered by votes in descending order
    const [articleRows] = await connection.execute('select * from articles order by votes desc');
    // Return the articles along with user info (from locals)
    return{
        user: locals.user,
        articles : articleRows

    }
}
export const actions = {
    // Action to create a new article
    createArticle: async ({ request }) => {
        let formData = await request.formData();
        const connection = await createConnection();

        // Get the form data values for the image, author, and description
        const image = formData.get('image');
        const author = formData.get('author');
        const description = formData.get('description');

         // If no image is provided, throw an error
        if (!image) {
            throw error(400, { message: 'No file to upload.' });
        }
        // Upload the image to Vercel's blob storage and get the image URL
        const { url } = await put('insta-images/' + image.name, image, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });
        // Insert the new article into the database with the image URL, description, and author
        const [result] = await connection.execute(
            'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
            [url, description, author]
        );
        // If the article is inserted successfully, redirect to the homepage
        if (result.affectedRows) {
            redirect(303, '/');
        }

        return { uploaded: url };
    },
    // Action to delete an article
    deleteArticle: async ({request}) => {
        const formData = await request.formData();
		const id = formData.get('id'); // Get the article ID from the form
		const connection = await createConnection();
		
         // Delete the article from the database using its ID
		await connection.execute('delete from articles where id = ?', [id]);
	}
};
