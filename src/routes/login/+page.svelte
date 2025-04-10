<script>
	import Warning from '$lib/components/Warning.svelte';
	let { data, form } = $props();
	import { enhance } from '$app/forms';
	import { ShieldBan } from 'lucide-svelte';


</script>

{#if data.user}
  <main class="flex items-center justify-center h-100 bg-gray-100">
	<div class="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-md text-center flex justify-center items-center flex-col m-10">
		<ShieldBan />
	
	  <p class="text-lg font-semibold">Admin Access Only</p>
	  <p class="text-sm mt-1">This section is restricted to administrators. Unauthorized access is not permitted.</p>
	</div>
  </main>
  
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-100">
		<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
			<form action="?/login" method="POST" use:enhance>
				<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Login</h1>

				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">E-Mail</label>
				<input
					type="text"
					name="email"
					id="email"
					required
					placeholder="Enter your email"
					class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>

				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					placeholder="Enter your password"
					class="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>

				<button
					type="submit"
					class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>Login</button
				>

				{#if form}
					<Warning message={form.message} class="mt-4" />
				{/if}
			</form>
			<p class="p-4 font-light text-gray-500">
				Don't have an account? <a
					href="/register"
					class="all pl-1 font-light text-blue-500 transition duration-100 hover:text-blue-700"
					>Sign up</a
				>
			</p>

			<a href="/" class="ml-40 text-blue-400">Go back</a>
		</div>
	</div>
{/if}
