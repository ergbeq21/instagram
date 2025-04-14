<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	import { Trash2 } from 'lucide-svelte';
	import { SendHorizontal } from 'lucide-svelte';
	import { Search } from 'lucide-svelte';



	







</script>

<main class="min-h-screen bg-gray-100 p-6 flex gap-4">

	<div class="w-80 bg-white rounded-xl p-6 shadow-sm">
		<form
			action="?/searchUser"
			class="flex gap-2 mb-4"
			method="POST"
			use:enhance
		>
			<input
				type="text"
				name="username"
				placeholder="Username"
				class="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
			/>
			<button
				type="submit"
				class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				<Search />

			</button>
		</form>

		{#if form && form.userInfo}
			<p class="text-sm text-green-600 mb-3">User found</p>
			<div class="flex items-center gap-3">
				<img src={form.userInfo.image} alt="" class="h-12 w-12 rounded-full object-cover" />
				<p class="font-medium">{form.userInfo.username}</p>
			</div>
		{:else if form && form.error}
			<p class="text-sm text-red-500">{form.error}</p>
		{:else}
			<p class="text-sm text-gray-500">Please enter a username to search.</p>
		{/if}
	</div>


	<div class="flex-1 bg-white rounded-xl p-6 shadow-sm flex flex-col ">
		{#if form && form.userInfo}

			<div class="flex items-center gap-3 mb-4 border-b pb-3">
				<img src={form.userInfo.image} alt="" class="h-12 w-12 rounded-full object-cover" />
				<p class="font-medium">{form.userInfo.username}</p>
			</div>

			<div class="flex-1 flex-col-reverse overflow-y-auto space-y-3 mb-4 max-h-[60vh] pr-2 bg-gray-100" >
				{#each data.messages as message}
					{#if (message.user_id === form.userInfo.id && message.user2_id === data.user.id) || (message.user_id === data.user.id && message.user2_id === form.userInfo.id)}

							<div class={`m-2 flex ${message.user_id === data.user.id ? 'justify-start' : 'justify-end'}`}>
						
								<div class={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
									message.user_id === data.user.id
										? 'bg-white text-right text-gray-800 rounded-br-none'
										: 'bg-blue-500 text-left text-white rounded-bl-none'
								}`}>
									<p class="text-xl">{message.text}</p>
									<form action="?/deleteYourMessage" method="post" use:enhance>
		
										<input type="hidden" name="messageID" value={message.id}>
		
										<button type="submit" class="text-red-800 mt-1">
											<Trash2 size="16" />
										</button>
									
									</form>
								</div>
							</div>
					
					{/if}
				{/each}	

			</div>
			

			
			<form
				action="?/searchUser"
				method="POST"
				use:enhance
				class="flex gap-2"
			>
				<input type="hidden" name="sendMessage" value="true" />
				<input type="hidden" name="username" value={form.userInfo.username} />
				<input type="hidden" name="userID" value={form.userInfo.id} />
				<input type="hidden" name="user2ID" value={data.user.id} />

				<input
					type="text"
					name="text"
					class="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-green-400"
					placeholder="Write a message..."
					required
				/>
				<button
					type="submit"
					class="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
				>
				<SendHorizontal size="20" />

				</button>

			</form>
		{/if}
	</div>
</main>



