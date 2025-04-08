<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	let { data } = $props();

	let articles = $state([]);

	onMount(async () => {
		const res = await fetch('/admin/api/article');
		articles = await res.json();
	});
</script>

<div class="flex items-center justify-center">
	{#if data.user}
		<p class="text-black-600 transitiontext-center pt-10 pr-14 text-xl font-extralight">
			Welcome {data.user.username}
		</p>
	{/if}
</div>

<section>
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<header>
			<h2 class="sm:text-3 text-xl font-bold text-gray-900">Image Collection</h2>

			<p class="mt-4 max-w-md text-gray-500">
				Ein modernes und interaktives Design, das es Nutzern ermöglicht, Artikel zu liken,
				Kommentare zu hinterlassen und Antworten zu sehen
			</p>
		</header>

		<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each articles as article}
				<li class="relative">
					<div class="group block overflow-hidden">
						<div class="relative">
							<img
								src={article.image}
								alt={article.description}
								class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
								loading="lazy"
							/>

							<!--Add to favourites function-->

							{#if data.user}
								{#if data.favorites.find((fav) => fav.article_id == article.id && fav.user_id == data.user.id)}
									{#each data.favorites.filter((fav) => fav.article_id == article.id && fav.user_id == data.user.id) as favorite}
										<form action="?/deleteFavorites" method="POST" use:enhance>
											<input type="hidden" name="favID" value={favorite.id} />
											<button
												class="absolute top-2 right-2 flex cursor-pointer items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs text-white shadow-md transition duration-500 hover:bg-red-500"
											>
												<span class="hidden sm:inline">Added to</span> ♥
											</button>
										</form>
									{/each}
								{:else}
									<form action="?/addFavorites" method="POST" use:enhance>
										<input type="hidden" name="articleID" value={article.id} />
										<input type="hidden" name="userID" value={data.user.id} />
										<button
											class="absolute top-2 right-2 flex cursor-pointer items-center gap-1 rounded bg-teal-600 px-2 py-1 text-xs text-white shadow-md transition duration-500 hover:bg-teal-500"
										>
											<span class="hidden sm:inline">Add to</span> ♥
										</button>
									</form>
								{/if}
							{:else}
								<a
									href="/login"
									class="absolute top-2 right-2 flex cursor-pointer items-center gap-1 rounded bg-teal-600 px-2 py-1 text-xs text-white shadow-md transition duration-500 hover:bg-teal-500"
								>
									<span class="hidden sm:inline">Login to add to</span> ♥
								</a>
							{/if}
						</div>
					</div>

					<!--Add to favourites function-->

					<!--Info-->
					<div class="relative bg-white pt-3">
						<a
							href="/admin/api/article/{article.id}"
							class=" text-s font-light text-gray-700 transition duration-500 group-hover:underline group-hover:underline-offset-4 hover:text-teal-500 hover:underline"
						>
							{article.description}
						</a>

						<div class="mt-3">
							<div class="flex items-center space-x-4 text-xs">
								<span class="inline-flex items-center text-gray-600">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-1 h-3.5 w-3.5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
											clip-rule="evenodd"
										/>
									</svg>
									{article.author}
								</span>
								{#if data.user}
									{#if data.upvotes.find((upvote) => upvote.article_id == article.id && upvote.user_id == data.user.id)}
										<form action="?/downVote" method="POST">
											<input type="hidden" name="voteId" value={article.id} />
											<input type="hidden" name="userID" value={data.user.id} />

											<button
												class="inline-flex items-center rounded text-blue-600 transition-colors duration-100 hover:text-blue-800"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="mr-1 h-3.5 w-3.5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
													/>
												</svg>
												{article.votes}
											</button>
										</form>
									{:else}
										<form action="?/upVote" method="POST">
											<input type="hidden" name="voteId" value={article.id} />
											<input type="hidden" name="userID" value={data.user.id} />

											<button
												class="inline-flex items-center rounded text-gray-600 transition-colors duration-100 hover:text-blue-500"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="mr-1 h-3.5 w-3.5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
													/>
												</svg>
												{article.votes}
											</button>
										</form>
									{/if}
								{:else}
									<button
										class="inline-flex items-center rounded text-gray-600 transition-colors duration-100"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-1 h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
											/>
										</svg>
										{article.votes}
									</button>
								{/if}
							</div>
						</div>
					</div>
					<!--Info-->
				</li>
			{/each}
		</ul>
	</div>
</section>
