<script>
	let { data } = $props();
	import { UserMinus } from 'lucide-svelte';

</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="p-5 text-center text-5xl">Admin page</h1>
	<p class="text-2xl">This is the users section</p>
</div>



<main class="p-15 ">
	<div class="flex bg-gray-100 flex-row p-5 m-5 justify-around items-center font-bold">
        <p class="">ID</p>
		<p class="">EMAIL</p>
		<p class="">USERNAME</p>
		<p class="">ROLE</p>
		<p>DELETE</p>

	</div>
	<div>
	{#each data.users as user}
	{#if user.role != 'admin'}
		<div class=" flex flex-row justify-around box m-4 p-1 shadow-md transition-all duration-700 hover:scale-101" transition:slide>
			<p class="font-mono">{user.id}</p>
			<p class="font-mono">{user.email}</p>
			<p class="font-mono">{user.username}</p>
			<p class="font-mono">{user.role}</p>



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
</div>

</main>


