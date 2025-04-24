import { register } from '$lib/db/auth'; // Import the 'register' function to handle user registration from the auth module
import { redirect } from '@sveltejs/kit';  // Import the redirect function to send users to another page after successful registration
 
export const actions = {
	// This action handles user registration
	register: async ({ request, cookies }) => {
		const formData = await request.formData(); // Get the data submitted from the registration form
		const email = formData.get('email');  // Get the email input from the form
		const password = formData.get('password'); // Get the password input from the form
		const username = formData.get('username'); // Get the username input from the form
		const image = formData.get('image'); // Get the profile image input from the form

		// Call the register function with the collected data (email, username, password, image)
		const { token, message } = await register(email, username, password, image);

	    // If the registration is successful and a token is returned
		if (token) {
			// Set the session cookie with the token, so the user stays logged in
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7, // Set cookie to expire after 7 days
				path: '/', // Cookie is available throughout the entire site
				httpOnly: true, 
				sameSite: 'strict'
			}); 
			// Redirect the user to the homepage after registration
			redirect(302, '/');
		} else {
			 // If registration fails, return an error message
			return {
				success: false,
				message: message
			};
		}
	}
};
