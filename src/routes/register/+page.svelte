<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="min-h-screen flex justify-center items-center bg-gray-100">
	<form action="?/register" method="POST" use:enhance class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
		<h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h1>
		
		<label for="email" class="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
		<input type="text" name="email" id="email" required class="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

		<label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
		<input type="text" name="username" id="username" required class="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

		<label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
		<input type="password" name="password" id="password" required class="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

		<button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>

		{#if form}
			<Warning message={form.message} class="mt-4"/>
		{/if}
	</form>
</div>
