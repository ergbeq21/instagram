<script>
	import { onMount } from 'svelte';
	let articles = [];

	onMount(async () => {
		const res = await fetch('/admin/api/article');
		articles = await res.json();
	});
</script>

<div class="flex items-center justify-center p-2">
	<a href="/admin/api/article" class="font-mono transition-all duration-300 ease-in-out hover:text-blue-700 hover:text-xl">Go To Admin Section</a>
</div>

<main class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 bg-blue-50">
	{#each articles as article}
		<a href="/admin/api/article/{article.id}" class="block bg-white p-2 shadow-md hover:shadow-lg">
			<img src={article.image} alt={article.description} class="h-48 w-full object-cover" />
			<p class="mt-2 text-sm">{article.description}</p>
			<p class="text-xs text-gray-500">By {article.author}</p>
			<p class="text-xs text-gray-500">Votes: {article.votes}</p>
		</a>
	{/each}
</main>


