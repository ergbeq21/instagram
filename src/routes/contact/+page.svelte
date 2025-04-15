<script>
	import Warning from '$lib/components/Warning.svelte';
	let { data, form } = $props();
	import { enhance } from '$app/forms';
	import { ShieldBan } from 'lucide-svelte';


</script>


{#if data.user}

<div class="flex min-h-screen items-center justify-center bg-gray-100">
		<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
			<form action="?/contact" method="POST" use:enhance>
				<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Contact Us</h1>
				<input
					type="hidden"
                    name="username"
                    value={data.user.username}
					class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
                <label for="Topic" class="mb-2 block text-sm font-medium text-gray-700">Topic</label>
                <textarea
					name="topic"
					placeholder="Write your topic here..."
					class="h-15 w-full rounded-lg border border-gray-300 mb-3 resize-none"
				></textarea>



				<label for="Your message" class="mb-2 block text-sm font-medium text-gray-700">Message</label>
                <textarea
					name="text"
					placeholder="Write your message here..."
					class="h-40 w-full rounded-lg border border-gray-300 mb-3 resize-none"
				></textarea>

				<button
					type="submit"
					class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>Send message</button
				>
			</form>
		

		</div>
</div>
{:else}

<div class="flex flex-col items-center justify-center h-110 bg-gray-100 p-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Welcome! Please create an account or log in
      </h1>
      <div class="flex items-center justify-center gap-4">
        <a href="/login" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</a>
        <span class="text-gray-500">or</span>
        <a href="/register" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Sign Up</a>
      </div>
    </div>
  </div>  

{/if}

