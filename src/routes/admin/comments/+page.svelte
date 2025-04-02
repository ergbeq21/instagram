
<script>
    let { data, form} = $props();
</script>


<div class="flex items-center justify-center flex-col p-6">
<h1 class="font-mono text-3xl">This is the comment section</h1>
</div>
<main class="p-15">
	{#each data.comments as comment}
		<div class="box m-4 p-4 shadow-md transition-all duration-700 hover:scale-101" transition:slide>
			<p class="font-mono">ID: {comment.id}</p>
			<p class="font-mono">NAME: {comment.name}</p>
			<p class="font-mono">COMMENT: {comment.text}</p>

			<form action="?/deleteComment" method="POST">
				<input type="hidden" name="id" value={comment.id} />
				<button
					type="submit"
					class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
				>
					Delete
				</button>

			</form>

			
			<details class="cursor-pointer pl-5">
				<summary>See all replies for this comment</summary>
				{#each data.replies as reply }
				
				  <p class="font-mono text-xs">ID: {reply.id}</p>
			      <p class="font-mono text-xs">NAME: {reply.name}</p>
			      <p class="font-mono text-xs">REPLY: {reply.text}</p>

			    <form action="?/deleteReply" method="POST">
				<input type="hidden" name="replyId" value={reply.id} />
				<button
					type="submit"
					class=" text-xs pt-1 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
				>
					Delete
				</button>
			</form>
			{/each}
			</details>
				
			
			
		</div>
	{/each}
</main>