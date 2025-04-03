<script>
	let { data } = $props();
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
						<a class="text-gray-500 transition hover:text-gray-500/75" href="/about"> About </a>
					</li>

					<li class="relative group">
						<button class=" text-gray-500  px-4 py-2 rounded transition hover:text-gray-500/75">Admin</button>
						<ul class="absolute left-0 mt-0.1 w-40 rounded shadow-lg hidden group-hover:block">
							<li><a href="/admin/users" class=" text-gray-500  block px-4 py-2 transition hover:text-gray-500/75 ">Users</a></li>
							<li><a href="/admin/api/article" class=" text-gray-500  block px-4 py-2 transition hover:text-gray-500/75 ">Articles</a></li>
							<li><a href="/admin/comments" class=" text-gray-500  block px-4 py-2 transition hover:text-gray-500/75">Comments</a></li>
						</ul>
					</li>
				</ul>
			</nav>

			{#if data.user}
			
				<div class="flex items-center justify-center">
					<form action="/logout?/logout" method="POST" class="p-1">
						<button
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
							>Logout</button
						>
					</form>
					<form action="/logout?/deleteAccount" method="POST" class="p-1">
						<button
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
							>Delete Account</button
						>
					</form>
				</div>
			{:else}
				<div class="flex items-center gap-4">
					<div class="sm:flex sm:gap-4">
						<a
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
							href="/login"
						>
							Login
						</a>
						<a
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
							href="/register"
						>
							Register
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>

<!--Header-->

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
											<form action="?/upVote" method="POST">
											<input type="hidden" name="voteId" value={article.id} />
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
