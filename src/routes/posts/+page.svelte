<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';
	import { MoveRight, Delete } from 'lucide-svelte';

	let { data, form } = $props();
</script>

{#if !data.user}
	<div class="flex h-70 items-center justify-center">
		<p class="text-gray-600">You need an account to upload your own posts.</p>
	</div>
{:else}
	<main class="flex flex-col md:flex-row h-full md:h-screen items-start justify-evenly bg-green-100 p-6 space-y-6 md:space-y-0 md:space-x-6">

		<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
			<h1 class="mb-6 text-2xl font-bold text-gray-800 text-center">Create Article</h1>
			
			<form
				action="?/createArticle"
				method="POST"
				use:enhance
				enctype="multipart/form-data"
				class="space-y-4"
			>
				<input
					type="file"
					name="image"
					class="w-full rounded-lg border border-gray-300 p-2"
				/>

				<input
					type="hidden"
					name="author"
					value={data.user.username}
				/>

				<textarea
					name="description"
					placeholder="Write your description here..."
					class="h-40 w-full rounded-lg border border-gray-300 p-2 resize-none"
				></textarea>

				<button
					type="submit"
					class="w-full rounded-lg bg-green-500 py-2 text-white font-medium transition hover:bg-green-600"
				>
					Upload my Article
				</button>

				<a
					href="/"
					class="flex items-center justify-center text-green-500 hover:text-green-700 transition duration-200"
				>
					Go back to Feed
					<MoveRight size="18" class="ml-2" />
				</a>
			</form>
		</div>


		<div class="w-full md:w-1/2 space-y-6">
			{#each data.articles as article}
				{#if data.user.username == article.author}
					<div class="flex space-x-4 rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.01]">
						<img
							src={article.image}
							alt=""
							class="h-40 w-40 rounded-md object-cover"
						/>

						<div class="flex flex-col space-y-1 text-sm">
							<p><span class="font-semibold text-gray-600">ID:</span> {article.id}</p>
							<p><span class="font-semibold text-gray-600">Description:</span> {article.description}</p>
							<p><span class="font-semibold text-gray-600">Votes:</span> {article.votes}</p>

							<form action="?/deleteArticle" method="POST" class="mt-2">
								<input type="hidden" name="id" value={article.id} />
								<button
									type="submit"
									class="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-white text-sm transition hover:bg-red-700"
								>
									<Delete size="16" />
									Delete
								</button>
							</form>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</main>
{/if}
