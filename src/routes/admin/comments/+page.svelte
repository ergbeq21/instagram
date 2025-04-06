<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
</script>




<div class="flex flex-col items-center justify-center">
	<h1 class="p-5 text-center text-5xl">Admin page</h1>
	<p class="text-2xl">This is the comment section</p>
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

				{#each data.replies as reply}
					{#if reply.comment_id == comment.id}
						<p class="font-mono text-xs">ID: {reply.id}</p>
						<p class="font-mono text-xs">NAME: {reply.name}</p>
						<p class="font-mono text-xs">REPLY: {reply.text}</p>

						<form action="?/deleteReply" method="POST">
							<input type="hidden" name="replyId" value={reply.id} />
							<button
								type="submit"
								class=" cursor-pointer rounded-md bg-red-600 px-4 py-2 pt-1 text-xs text-white transition duration-300 hover:bg-red-700"
							>
								Delete
							</button>
						</form>
					{/if}
				{/each}
			</details>
		</div>
	{/each}
</main>
