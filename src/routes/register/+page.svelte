<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;

	let password = '';
	let errorMessage = '';

	function validatePassword() {
		const hasLower = /[a-z]/.test(password);
		const hasNumber = /\d/.test(password);
		const hasUpper = /[A-Z]/.test(password);

		if (password.length >= 8 && hasLower && hasNumber && hasUpper) {
			errorMessage = '';
		} else {
			errorMessage =
				'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter and one number.';
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<form action="?/register" method="POST" use:enhance>
			<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Sign up</h1>

			<label for="username" class="mb-2 block text-sm font-medium text-gray-700">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				required
				placeholder="Create a username"
				class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<label for="email" class="mb-2 block text-sm font-medium text-gray-700">E-Mail</label>
			<input
				type="email"
				pattern=".+\.com"
				name="email"
				id="email"
				title="This email is not valid"
				required
				placeholder="Enter your email"
				class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<label for="password" class="mb-2 block text-sm font-medium text-gray-700"
				>Password <span class="text-xs text-gray-500">(8 or more characters )</span></label
			>
			<input
				id="password"
				type="password"
				name="password"
				bind:value={password}
				on:input={validatePassword}
				required
				placeholder="Create your password"
				minlength="8"
				class="mb-3 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<p class="p-2 text-xs text-red-500">{errorMessage}</p>

			<button
				type="submit"
				class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>Register</button
			>

			{#if form}
				<Warning message={form.message} class="mt-4" />
			{/if}
		</form>
		<p class="p-4 font-light text-gray-500">
			Already have an account? <a
				href="/login"
				class="all pl-1 font-light text-blue-500 transition duration-100 hover:text-blue-700"
				>Log in</a
			>
		</p>

		<a href="/" class="ml-40 text-blue-400">Go back</a>
	</div>
</div>
