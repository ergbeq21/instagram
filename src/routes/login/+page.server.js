import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	let connection = await createConnection();

	return {
		user: locals.user
	};
}

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const token = await login(email, password);

		if (token) {
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7,
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				path: '/'
			});
			redirect(302, '/');
		} else {
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};
