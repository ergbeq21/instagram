<script>
    import { enhance } from "$app/forms";
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




<main class="flex justify-center items-center min-h-screen bg-gray-100 flex-col gap-2">
    <div class="p-10 bg-white shadow-lg rounded-lg max-w-md w-full">
        <form action="?/searchUser" class="flex justify-between items-center mb-4" method="POST" use:enhance>
            <input type="text" name="username" placeholder="Search username" class="h-10 px-4 border rounded-lg w-full text-sm">
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600">Search</button>
        </form>

        {#if form && form.userInfo}
            <p class="text-l font-medium text-green-600">User found</p>
            <p class="text-lg font-medium">Username: {form.userInfo.username}</p>
            <p class="text-sm text-gray-600">Email: {form.userInfo.email}</p>
        {:else if form && form.error}
            <p class="text-red-400 text-xs pl-1">{form.error}</p>
        {:else}
            <p class="text-gray-500 text-sm">Please enter a username to search.</p>
        {/if}

        {#if form && form.userInfo}
		<details bind:open={isOpen} class="cursor-pointer">
			<summary>See your messages with {form.userInfo.username}</summary>
			{#each data.messages as message}
			  {#if (message.user_id === form.userInfo.id && message.user2_id === data.user.id) || (message.user_id === data.user.id && message.user2_id === form.userInfo.id)}
				<p>{message.user_id === form.userInfo.id ? 'You' : form.userInfo.username}: {message.text}  
				  <span class="text-xs text-gray-400">{message.created_at}</span>
				</p>
			  {/if}
			{/each}
		  </details>
        {/if}
    </div>

    <div class="ml-10">
        {#if form && form.userInfo}
            <form action="?/searchUser" method="POST" class="bg-white shadow-lg rounded-lg p-6 w-80" use:enhance>
                <input type="hidden" name="sendMessage" value="true">
                <input type="hidden" name="username" value={form.userInfo.username}>
                <input type="hidden" name="userID" value={form.userInfo.id}>
                <input type="hidden" name="user2ID" value={data.user.id}>

                <p class="font-semibold text-sm mb-2">Send Message to {form.userInfo.username}</p>
                <input type="text" name="text" class="w-full h-10 px-4 border rounded-lg mb-3 text-sm" placeholder="Write a message..." required>
                <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">Send message</button>
            </form>
        {/if}
    </div>
</main>


