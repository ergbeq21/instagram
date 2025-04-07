<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	console.log(data.messages);

	// svelte-ignore non_reactive_update
	let isOpen = false; // Track if details is open

	function handleSendMessageResult({ result }) {
		if (result?.type === 'success') {
			isOpen = true; // Keep messages open after sending a message
		}
	}
</script>

<main class="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
		<form
			action="?/searchUser"
			class="mb-4 flex items-center justify-between"
			method="POST"
			use:enhance
		>
			<input
				type="text"
				name="username"
				placeholder="Search username"
				class="h-10 w-full rounded-lg border px-4 text-sm"
			/>
			<button
				type="submit"
				class="ml-2 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">Search</button
			>
		</form>

		{#if form && form.userInfo}
			<p class="text-l font-medium text-green-600">User found</p>
			<p class="text-lg font-medium">Username: {form.userInfo.username}</p>
			<p class="text-sm text-gray-600">Email: {form.userInfo.email}</p>
		{:else if form && form.error}
			<p class="pl-1 text-xs text-red-400">{form.error}</p>
		{:else}
			<p class="text-sm text-gray-500">Please enter a username to search.</p>
		{/if}

		{#if form && form.userInfo}
			<details bind:open={isOpen} class="cursor-pointer">
				<summary>See your messages with {form.userInfo.username}</summary>
				{#each data.messages as message}
					{#if (message.user_id === form.userInfo.id && message.user2_id === data.user.id) || (message.user_id === data.user.id && message.user2_id === form.userInfo.id)}
						<p>
							{message.user_id === form.userInfo.id ? 'You' : form.userInfo.username}: {message.text}
							<span class="text-xs text-gray-400">{message.created_at}</span>
						</p>
					{/if}
				{/each}
			</details>
		{/if}
	</div>

	<div class="ml-10">
		{#if form && form.userInfo}
			<form
				action="?/searchUser"
				method="POST"
				class="w-80 rounded-lg bg-white p-6 shadow-lg"
				use:enhance
			>
				<input type="hidden" name="sendMessage" value="true" />
				<input type="hidden" name="username" value={form.userInfo.username} />
				<input type="hidden" name="userID" value={form.userInfo.id} />
				<input type="hidden" name="user2ID" value={data.user.id} />

				<p class="mb-2 text-sm font-semibold">Send Message to {form.userInfo.username}</p>
				<input
					type="text"
					name="text"
					class="mb-3 h-10 w-full rounded-lg border px-4 text-sm"
					placeholder="Write a message..."
					required
				/>
				<button
					type="submit"
					class="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
					>Send message</button
				>
			</form>
		{/if}
	</div>
</main>
