<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';

	import { ChevronDown } from 'lucide-svelte';

	let { data, form } = $props();

	console.log(data.users);

	let article = $state();
	let uuid = get(page).params.uuid;

	onMount(async () => {
		const res = await fetch(`/admin/api/article/${uuid}`);
		article = await res.json();
	});


	let state = $state(false);
	function openClose(){
		state = true;

	}
</script>

<div class="flex min-h-screen items-center justify-center">
	{#if article}
		<div class="w-96 rounded border p-4 text-center shadow">
			<img src={article.image} alt={article.description} class="h-auto w-full rounded" />
			<h1 class="mt-2 text-lg font-medium">{article.description}</h1>
			<p class="text-xs text-gray-500">By {article.author}</p>
			<div>
				{#if data.user}
					{#if data.upvotes.find((upvote) => upvote.article_id == article.id && upvote.user_id == data.user.id)}
						<form action="?/downVote" method="POST">
							<input type="hidden" name="voteId" value={article.id} />
							<input type="hidden" name="userID" value={data.user.id} />
							<button type="submit" class="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white"
								>Down vote</button
							>
						</form>
					{:else}
						<form action="?/upVote" method="POST">
							<input type="hidden" name="voteId" value={article.id} />
							<input type="hidden" name="userID" value={data.user.id} />
							<button type="submit" class="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white"
								>Upvote</button
							>
						</form>
					{/if}
				{/if}
				<p class="m-2 text-xs text-gray-500">Votes: {article.votes}</p>
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
							<div class="flex items-start justify-between gap-3">
								<div class="flex items-start gap-3">
									{#each data.users as profileUser}
										{#if profileUser.username === comment.name}
											<img
												src={profileUser.image}
												alt="profile"
												class="h-10 w-10 rounded-full object-cover"
											/>
										{/if}
									{/each}

									<div>
										{#if data.user && data.user.username == comment.name && data.user}
										<p class="font-mono text-xs text-gray-300">You</p>
										{:else}
										<p class="font-mono text-xs text-gray-300">{comment.name}</p>

										{/if}
										<p class="pt-1.5 font-mono text-xs">{comment.text}</p>
									</div>
								</div>

								{#if data.user}
									{#if data.commentLikes.find((comLike) => comLike.comment_id == comment.id && comLike.user_id == data.user.id)}
										<form
											action="?/removelikeComment"
											method="POST"
											class="flex items-center"
											use:enhance
										>
											<input type="hidden" name="commentId" value={comment.id} />
											<input type="hidden" name="userId" value={data.user.id} />

											<button
												class="mt-2 flex flex-col items-center text-red-600 transition-colors duration-100 hover:text-red-700"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-5 w-5"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<path
														d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.5 
											 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
											 C13.09 3.81 14.76 3 16.5 3 
											 19.58 3 22 5.42 22 8.5 
											 c0 3.89-3.14 6.74-9 11.84l-0.9.81z"
													/>
												</svg>
												<span class="text-xs font-light">{comment.likes}</span>
											</button>
										</form>
									{:else}
										<form
											action="?/likeComment"
											method="POST"
											class="flex items-center"
											use:enhance
										>
											<input type="hidden" name="commentId" value={comment.id} />
											<input type="hidden" name="userId" value={data.user.id} />

											<button
												class="mt-2 flex flex-col items-center text-white transition-colors duration-100 hover:text-red-500"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-5 w-5"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.5 
											 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
											 C13.09 3.81 14.76 3 16.5 3 
											 19.58 3 22 5.42 22 8.5 
											 c0 3.89-3.14 6.74-9 11.84l-0.9.81z"
													/>
												</svg>
												<span class="text-xs font-light">{comment.likes}</span>
											</button>
										</form>
									{/if}
								{/if}
							</div>

							<details>
								<summary class="flex cursor-pointer items-center text-gray-300 " onclick={openClose}>
									<hr class="m-2 w-10 border-t-1 border-gray-300" />
									View replies <ChevronDown size="15" class="mt-1 "/>

								</summary>
								{#each data.replys as reply}
									{#if reply.comment_id == comment.id}
										<div
											class="my- ml-5 flex items-start justify-between gap-3 p-1.5 text-left text-white"
										>
											<div class="flex items-start gap-3">
												{#each data.users as profileUser}
													{#if profileUser.username === reply.name}
														<img
															src={profileUser.image}
															alt="profile"
															class="h-10 w-10 rounded-full object-cover"
														/>
													{/if}
												{/each}

												<div>
													{#if data.user && data.user.username == reply.name && data.user.username != reply.name}
													<p class="font-mono text-xs text-gray-300">
														You <span> ▶ {comment.name}</span>
													</p>
													{:else if data.user && data.user.username == reply.name && data.user.username == comment.name}
													<p class="font-mono text-xs text-gray-300">
														You <span> ▶ You</span>
													</p>

													{:else if data.user && data.user.username == comment.name}
													<p class="font-mono text-xs text-gray-300">
														{reply.name} <span> ▶ You</span>
													</p>
													{:else if data.user && reply.name == data.user.username}
													<p class="font-mono text-xs text-gray-300">
														You <span> ▶ {comment.name}</span>
													</p>
													{:else}
													<p class="font-mono text-xs text-gray-300">
														{reply.name} <span> ▶ {comment.name}</span>
													</p>
													{/if}
													<p class="pt-1.5 font-mono text-xs">{reply.text}</p>
												</div>
											</div>

											{#if data.user}
												{#if data.replyLikes.find((repLike) => repLike.reply_id == reply.id && repLike.user_id == data.user.id)}
													<form
														action="?/removelikeReply"
														method="POST"
														class="flex items-center"
														use:enhance
													>
														<input type="hidden" name="replyId" value={reply.id} />
														<input type="hidden" name="userId" value={data.user.id} />

														<button
															class="mt-2 flex flex-col items-center text-red-600 transition-colors duration-100 hover:text-red-700"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="h-5 w-5"
																viewBox="0 0 24 24"
																fill="currentColor"
															>
																<path
																	d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.5 
														   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
														   C13.09 3.81 14.76 3 16.5 3 
														   19.58 3 22 5.42 22 8.5 
														   c0 3.89-3.14 6.74-9 11.84l-0.9.81z"
																/>
															</svg>
															<span class="text-xs font-light">{reply.likes}</span>
														</button>
													</form>
												{:else}
													<form
														action="?/likeReply"
														method="POST"
														class="flex items-center"
														use:enhance
													>
														<input type="hidden" name="replyId" value={reply.id} />
														<input type="hidden" name="userId" value={data.user.id} />

														<button
															class="mt-2 flex flex-col items-center text-white transition-colors duration-100 hover:text-red-500"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="h-5 w-5"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.5 
														   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
														   C13.09 3.81 14.76 3 16.5 3 
														   19.58 3 22 5.42 22 8.5 
														   c0 3.89-3.14 6.74-9 11.84l-0.9.81z"
																/>
															</svg>
															<span class="text-xs font-light">{reply.likes}</span>
														</button>
													</form>
												{/if}
											{/if}
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
