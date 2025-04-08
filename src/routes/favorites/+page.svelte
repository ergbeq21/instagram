<script>
	let { data } = $props();
</script>

<section>
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<header>
			<h2 class="sm:text-3 text-xl font-bold text-gray-900">Favorites Collection</h2>

			<p class="mt-4 max-w-md text-gray-500">
				Ein modernes und interaktives Design, das es Nutzern ermöglicht, Artikel zu liken,
				Kommentare zu hinterlassen und Antworten zu sehen
			</p>
		</header>

		<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#if data && data.favorites && data.articles && data.user}
				{#each data.favorites as favorite}
					{#each data.articles as article}
						{#if data.user.id == favorite.user_id && favorite.article_id == article.id}
							<li class="relative">
								<div class="group block overflow-hidden">
									<div class="relative">
										<img
											src={article.image}
											alt={article.description}
											class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
										/>

										<form action="?/deleteFavorites" method="POST">
											<input type="hidden" name="favID" value={favorite.id} />
											<button
												class="absolute top-4 right-4 flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-white shadow-md transition hover:bg-red-600"
											>
												Delete
											</button>
										</form>
									</div>
								</div>

								<!--INfo about the article-->

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
											<!--Like -->

											<!--fhfhfhfhfhf-->


											{#if data.upvotes.find((upvote) => upvote.article_id == article.id && upvote.user_id == data.user.id)}
										<form action="?/downVote" method="POST">
											<input type="hidden" name="voteId" value={article.id} />
											<input type="hidden" name="userID" value={data.user.id} />

											<button class="inline-flex items-center rounded text-blue-600 transition-colors duration-100 hover:text-blue-800">
											
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



											<!--shshshshsshs-->
										</div>
									</div>
								</div>

								<!--INfo about the article-->
							</li>
						{/if}
					{/each}
				{/each}
			{:else}
				<p class="text-xs text-gray-500">You need a account to add articles to favorites</p>
			{/if}
		</ul>
	</div>
</section>
