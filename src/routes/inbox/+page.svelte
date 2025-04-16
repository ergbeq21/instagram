

<script>
    let { data } = $props();
    import { Delete } from 'lucide-svelte';

</script>


{#if data.user}

<p class="text-center">Messages sent</p>

{#each data.contacts as contact}
{#if contact.user_username == data.user.username && data.user.role != 'admin' }

        <div class="box m-4 flex items-start space-x-4 p-4 shadow-md transition-all duration-700 hover:scale-101">

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

{/if}
{/each}

<p class="text-center">Messages received</p>

{#each data.messages as message}
{#each data.contacts as contact}
{#if message.contact_id  == contact.id}

<div class="box m-4 flex items-start space-x-4 p-4 shadow-md transition-all duration-700 hover:scale-101">

    <div>

        <p class="font-mono">ID: {message.contact_id}</p>
        <p class="font-mono">Text: {message.text}</p>
    

        <form action="?/deleteMessageReceided" method="POST">
            <input type="hidden" name="id" value={message.id} />
            <button
                type="submit"
                class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
            >
            <Delete />


            </button>
        </form>
    </div>
</div>

{/if}
{/each}
{/each}







{:else}

<div>
    <h1>This section requires a account</h1>
</div>

{/if}