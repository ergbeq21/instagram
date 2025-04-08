<script>
	let { data } = $props();
	import { UserMinus } from 'lucide-svelte';

</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="p-5 text-center text-5xl">Admin page</h1>
	<p class="text-2xl">This is the users section</p>
</div>



<main class="p-15">
	{#each data.users as user}
	{#if user.role != 'admin'}
		<div class="box m-4 p-4 shadow-md transition-all duration-700 hover:scale-101" transition:slide>
			<p class="font-mono">ID: {user.id}</p>
			<p class="font-mono">EMAIL: {user.email}</p>
			<p class="font-mono">USERNAME: {user.username}</p>

			<form action="?/deleteUser" method="POST">
				<input type="hidden" name="id" value={user.id} />
				<button
					type="submit"
					class=" mt-2 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
				>
				<UserMinus />

				</button>
			</form>
		</div>
		{/if}
	{/each}
</main>


