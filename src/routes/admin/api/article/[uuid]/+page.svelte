<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    let { data } = $props();


    let article = $state();
    let uuid = get(page).params.uuid;

    onMount(async () => {
        const res = await fetch(`/admin/api/article/${uuid}`);
        article = await res.json();
    });
    
</script>


<div class="flex justify-center items-center min-h-screen">
    {#if article}
      <div class="p-4 text-center border rounded shadow w-96">
          <img src={article.image} alt={article.description} class="w-full h-auto rounded" />
          <h1 class="text-lg mt-2 font-medium">{article.description}</h1>
          <p class="text-gray-500 text-xs">By {article.author}</p>
          <p class="text-gray-500 text-xs">Votes: {article.votes}</p>
          <form action="?/upVote" method="POST">
            <input type="hidden" name="voteId" value={article.id}>
            <button type="submit" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">Upvote</button>
          </form>

          <form action="?/writeComment" method="POST" class="p-4 flex flex-col">
            <h2 class="text-blue-600 text-sm">Send a comment</h2>
            <input type="hidden" value={article.id} name="articleID">
            <input placeholder="Your name" type="text" name="name" class="border border-gray-300 rounded p-1 text-sm my-1">
            <input placeholder="Your comment" type="text" name="text" class="border border-gray-300 rounded p-1 text-sm my-1">
            <button type="submit" class="bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600 transition">Send</button>
          </form>
            
          
          <div class="bg-blue-100 p-4 mt-4 rounded-lg w-full text-sm">
            <h2 class="font-semibold text-left text-gray-800">All Comments</h2>
            {#each data.comments as comment}
            {#if article.id == comment.article_id}
                <div class="bg-blue-600 text-white p-3 my-2 rounded-lg text-left shadow-md">
                    <p class="font-mono text-xs"><strong>From:</strong> {comment.name}</p>
                    <p class="font-mono text-xs"><strong>Comment:</strong> {comment.text}</p>
                    <div class="flex items-center justify-between">
                      <form action="?/likeComment" method="POST">
                        <input type="hidden" name="likeId" value={comment.id}>
                        <button type="submit" class="text-xs px-1 py-0.4 text-black bg-white border border-gray-300 rounded hover:bg-red-500 hover:text-white transition-all h-5">
                          Like
                      </button>
                      </form>
                    <p class="font-mono text-[0.6rem] text-right">Likes: {comment.likes}</p>
                  </div>
                  <details>
                    <summary class="cursor-pointer">View replys</summary>
                    <p>True very nice eyes</p>
                  </details>

                </div>
            {/if}
            {/each}
        </div>
          
          <a href="/" class="text-blue-500 text-xs mt-2 ">Go Back</a>
      </div>
    {/if}
</div>
