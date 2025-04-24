import { login } from '$lib/db/auth';  // Import the login function for authentication
import { redirect } from '@sveltejs/kit'; // Import the redirect function to redirect after login
import { createConnection } from '$lib/db/mysql'; // Import to create a connection to the database

export async function load({ locals }) {
	// Create a connection to the database
	let connection = await createConnection();

	// Return the user data
	return {
		user: locals.user
	};
}

export const actions = {
	// This action handles the login functionality
	login: async ({ request, cookies }) => {
		 // Get the form data (email and password)
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		// Attempt to log in with the provided email and password
		const token = await login(email, password);

		 // If login is successful, set a cookie with the session token
		if (token) {
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7, // Cookie will expire in 7 days
				path: '/', // Cookie is valid for the whole website
				httpOnly: true,
				sameSite: 'strict',
				path: '/'
			}); 
			 // Redirect to the homepage after successful login
			redirect(302, '/');
		} else { 
			// If login fails, return an error message
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};
