
<script>
	let { data } = $props();
	import { Delete } from 'lucide-svelte';


</script>


<main class="p-15">


    <div>
        <h1 class="text-center font-light">All messages from users</h1>
    </div>
	{#each data.contacts as contact}
		<div
			class="box m-4 flex items-start space-x-4 p-4 shadow-md transition-all duration-700 hover:scale-101"
		>

			<div>
				<p class="font-mono">ID: {contact.id}</p>
				<p class="font-mono">Username: {contact.user_username}</p>
				<p class="font-mono">Text: {contact.text}</p>
			

				<form action="?/deleteContact" method="POST">
					<input type="hidden" name="id" value={contact.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
					>
					<Delete />


					</button>
				</form>
			</div>
		</div>
	{/each}
</main>