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

<!--Header-->

<header class="bg-white">
	<div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
		<a class="block text-teal-600" href="/">
			<span class="sr-only">Home</span>
			<svg class="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
					fill="currentColor"
				/>
			</svg>
		</a>

		<div class="flex flex-1 items-center justify-end md:justify-between">
			<nav aria-label="Global" class="hidden md:block">
				<ul class="flex items-center gap-6 text-sm">
					<li>
						<a class="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
					</li>

					<li>
						<a class="text-gray-500 transition hover:text-gray-500/75" href="/favorites">
							Favorites
						</a>
					</li>

					<li>
						<a class="text-gray-500 transition hover:text-gray-500/75" href="/chat">
							Chat
						</a>
					</li>
					
					<li>
						<a class="text-gray-500 transition hover:text-gray-500/75" href="/about"> About </a>
					</li>

					<li class="group relative">
						<button class=" rounded px-4 py-2 text-gray-500 transition hover:text-gray-500/75"
							>Admin</button
						>
						<ul class="mt-0.1 absolute left-0 hidden w-40 rounded shadow-lg group-hover:block">
							<li>
								<a
									href="/admin/users"
									class=" block px-4 py-2 text-gray-500 transition hover:text-gray-500/75">Users</a
								>
							</li>
							<li>
								<a
									href="/admin/api/article"
									class=" block px-4 py-2 text-gray-500 transition hover:text-gray-500/75"
									>Articles</a
								>
							</li>
							<li>
								<a
									href="/admin/comments"
									class=" block px-4 py-2 text-gray-500 transition hover:text-gray-500/75"
									>Comments</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</nav>

			{#if data.user}
				<div class="flex items-center justify-center">
					<form action="/logout?/logout" method="POST" class="p-1">
						<button
							class="block cursor-pointer rounded-md bg-teal-500 px-1.5 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
							>Logout</button
						>
					</form>

					<details
						class="block cursor-pointer rounded-md bg-teal-500 px-1.5 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
					>
						<summary class="cursor-pointer list-none">Delete account</summary>

						<div class="mt-2">
							<form action="/logout?/deleteAccount" method="POST">
								<button
									type="submit"
									class=" text-white-400 w-full cursor-pointer rounded-md bg-red-500 px-5 py-2 text-xs font-medium transition duration-100 hover:bg-red-700"
								>
									Delete
								</button>
							</form>
						</div>
					</details>
				</div>
			{:else}
				<div class="flex items-center justify-center gap-1">
					<a
						class="block cursor-pointer rounded-md bg-teal-500 p-1 px-1.5 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
						href="/login"
					>
						Login
					</a>
					<a
						class="block cursor-pointer rounded-md bg-teal-500 px-1.5 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
						href="/register"
					>
						Register
					</a>
				</div>
			{/if}
		</div>
	</div>
</header>

<!--Header-->

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
								<p class="font-mono text-xs"><strong>From:</strong> {comment.name}</p>
								<p class="font-mono text-xs"><strong>Comment:</strong> {comment.text}</p>
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
							<summary class="cursor-pointer">View replys</summary>
					
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
