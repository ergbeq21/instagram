<script>
	let { data } = $props();
	import { Delete } from 'lucide-svelte';


</script>

<!--Header-->

<!--Header-->

<div class="flex flex-col items-center justify-center">
	<h1 class="p-5 text-center text-5xl">Admin page</h1>
	<a href="/admin/api/article/new" class="text-2xl">Create a new article</a>
</div>

<main class="p-15">
	{#each data.articles as article}
		<div
			class="box m-4 flex items-start space-x-4 p-4 shadow-md transition-all duration-700 hover:scale-101"
		>
			<img src={article.image} alt="" class="h-50 w-50 rounded-md object-cover" />

			<div>
				<p class="font-mono">ID: {article.id}</p>
				<p class="font-mono">Description: {article.description}</p>
				<p class="font-mono">Image: {article.image}</p>
				<p class="font-mono">Author: {article.author}</p>
				<p class="font-mono">Votes: {article.votes}</p>

				<form action="?/deleteArticle" method="POST">
					<input type="hidden" name="id" value={article.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700"
					>
					<Delete />


					</button>
				</form>
			</div>
		</div>
	{/each}
</main>
