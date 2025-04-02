<script>
	import { onMount } from 'svelte';
	let articles = [];

	onMount(async () => {
		const res = await fetch('/admin/api/article');
		articles = await res.json();
	});
</script>



<section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header>
      <h2 class="text-xl font-bold text-gray-900 sm:text-3">Image Collection</h2>

      <p class="mt-4 max-w-md text-gray-500">
		Ein modernes und interaktives Design, das es Nutzern ermöglicht, Artikel 
		zu liken, Kommentare zu hinterlassen und Antworten zu sehen 
      </p>
    </header>

    <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each articles as article}
      <li>
        <a href="/admin/api/article/{article.id}" class="group block overflow-hidden">
          <img
            src={article.image}
            alt={article.description}
            class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div class="relative bg-white pt-3">
            <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {article.description}
            </h3>

            <div class="mt-2">
              <span class="sr-only"> Votes </span>

			  <div class="flex items-start flex-col">
				<span class="tracking-wider text-gray-900 text-xs">Author: {article.author} </span>
				<span class="tracking-wider text-gray-900 text-xs">Votes: {article.votes} </span>

			  </div>
              
            </div>
          </div>
        </a>
      </li>
	  {/each}
    </ul>
  </div>
</section>




 