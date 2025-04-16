
<script>
	let { data } = $props();
	import { Delete } from 'lucide-svelte';
    import { SquareArrowOutUpRight } from 'lucide-svelte';



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
			

                <div class="flex gap-2 flex-row">
				<form action="?/deleteContact" method="POST">
					<input type="hidden" name="id" value={contact.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
					>
					<Delete />


					</button>
				</form>

                <a href="/admin/answerContact" class=" flex flex-row gap-1 cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700">
                    <span>Reply</span>  <SquareArrowOutUpRight />


                </a>
                         
                 </div>

			</div>
		</div>
	{/each}

    <div>
        <h1 class="text-center font-light">All sent messages</h1>
    </div>

    {#each data.sents as sent }

    <div
			class="box m-4 flex items-start space-x-4 p-4 shadow-md transition-all duration-700 hover:scale-101"
		>

			<div>
				<p class="font-mono">ID: {sent.id}</p>
				<p class="font-mono">Text: {sent.text}</p>
			

                <div class="flex gap-2 flex-row">
				<form action="?/deleteSent" method="POST">
					<input type="hidden" name="id" value={sent.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
					>
					<Delete />


					</button>
				</form>
                         
                 </div>

			</div>
		</div>

    {/each}

    
</main>