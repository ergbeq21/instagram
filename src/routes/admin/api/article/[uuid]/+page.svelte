<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	let { data, form } = $props();


	console.log(data.users);

	let article = $state();
	let uuid = get(page).params.uuid;

	onMount(async () => {
		const res = await fetch(`/admin/api/article/${uuid}`);
		article = await res.json();
	});
</script>





<div class="flex min-h-screen items-center justify-center">
	{#if article}
		<div class="w-96 rounded border p-4 text-center shadow">
			<img src={article.image} alt={article.description} class="h-auto w-full rounded" />
			<h1 class="mt-2 text-lg font-medium">{article.description}</h1>
			<p class="text-xs text-gray-500">By {article.author}</p>
			<div>
				<form action="?/upVote" method="POST">
					<input type="hidden" name="voteId" value={article.id} />
					<button type="submit" class="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white"
						>Upvote</button
					>
				</form>
				<p class="text-xs text-gray-500">Votes: {article.votes}</p>
			</div>

			<form action="?/writeComment" method="POST" class="flex flex-col p-4" use:enhance>
				<h2 class="text-sm text-blue-600">Send a comment</h2>
				<input type="hidden" value={article.id} name="articleID" />
				{#if data.user}
					<input
						type="hidden"
						name="name"
						value={data.user.username}
						class="my-1 rounded border border-gray-300 p-1 text-sm"
					/>
					<input
						placeholder="Your comment"
						type="text"
						name="text"
						class="my-1 rounded border border-gray-300 p-1 text-sm"
					/>
				{:else}
					<input
						placeholder="Write you name"
						name="name"
						class="my-1 rounded border border-gray-300 p-1 text-sm"
					/>
					<input
						placeholder="Your comment"
						type="text"
						name="text"
						class="my-1 rounded border border-gray-300 p-1 text-sm"
					/>
				{/if}
				<button
					type="submit"
					class="rounded bg-blue-500 py-1 text-sm text-white transition hover:bg-blue-600"
					>Send</button
				>
			</form>

			<div class="mt-4 w-full rounded-lg bg-blue-100 p-4 text-sm">
				<h2 class="text-left font-semibold text-gray-800">All Comments</h2>
				{#each data.comments as comment}
					{#if article.id == comment.article_id}
					
					<div class="my-2 rounded-lg bg-blue-600 p-3 text-left text-white shadow-md">
						<div class="flex items-start gap-3">
					        {#each data.users as profileUser}
		                    {#if profileUser.username === comment.name}

									<img src={profileUser.image} alt="profile" class="h-10 w-10 rounded-full object-cover"/>

		                   {/if}
	                       {/each}

							<div>
								<p class="font-mono text-xs text-gray-300"> {comment.name}</p>
								<p class="font-mono text-xs pt-1.5">{comment.text}</p>
							</div>
						</div>
					
						<div class="flex items-center justify-between mt-2">
							<form action="?/likeComment" method="POST" use:enhance>
								<input type="hidden" name="likeId" value={comment.id} />
								<button
									type="submit"
									class="py-0.5 h-5 rounded border border-gray-300 bg-white px-1 text-xs text-black transition-all hover:bg-red-500 hover:text-white"
								>
									Like
								</button>
							</form>
							<p class="text-right font-mono text-[0.6rem]">Likes: {comment.likes}</p>
						</div>
					
						<details>
							<summary class="cursor-pointer  flex items-center text-gray-300">
								<hr class="w-10 border-t-1 border-gray-300 m-2">
								 View replies
							</summary>			
							{#each data.replys as reply}
								{#if reply.comment_id == comment.id}
									<div class="my-1 rounded-lg bg-blue-400 p-1.5 text-left text-white shadow-md">
										<p class="font-mono text-xs"><strong>From:</strong> {reply.name}</p>
										<p class="font-mono text-xs"><strong>Reply:</strong> {reply.text}</p>
										<div class="flex items-center justify-between">
											<form action="?/likeReply" method="POST" use:enhance>
												<input type="hidden" name="replylikeId" value={reply.id} />
												<button
													type="submit"
													class="py-0.5 h-5 rounded border border-gray-300 bg-white px-1 text-xs text-black transition-all hover:bg-red-500 hover:text-white"
												>
													Like
												</button>
											</form>
											<p class="text-right font-mono text-[0.6rem]">Likes: {reply.likes}</p>
										</div>
									</div>
								{/if}
							{/each}
					
							<form
								action="?/writeReply"
								method="POST"
								class="flex flex-col p-4 text-black"
								use:enhance
							>
								<input type="hidden" value={comment.id} name="commentID" />
								{#if data.user}
									<input
										type="hidden"
										name="nameReply"
										value={data.user.username}
										class="my-1 rounded border border-gray-300 p-1 text-sm"
									/>
									<input
										placeholder="Reply to comment"
										type="text"
										name="textReply"
										class="my-1 rounded border border-gray-300 p-1 text-sm"
									/>
								{:else}
									<input
										placeholder="Your name"
										type="text"
										name="nameReply"
										class="my-1 rounded border border-gray-300 p-1 text-sm"
									/>
									<input
										placeholder="Reply to comment"
										type="text"
										name="textReply"
										class="my-1 rounded border border-gray-300 p-1 text-sm"
									/>
								{/if}
								<button
									type="submit"
									class="rounded bg-blue-500 py-1 text-sm text-white transition hover:bg-blue-600"
								>
									Send
								</button>
							</form>
						</details>
					</div>
					
					{/if}
				{/each}
			</div>

			<a href="/" class="mt-2 text-xs text-blue-500">Go Back</a>
		</div>
	{/if}
</div>
