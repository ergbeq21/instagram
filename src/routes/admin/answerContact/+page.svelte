

<script>
    let {data,form} = $props();
</script>



{#if data.user}

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form action="?/sendAnswer" method="POST" use:enhance>
            <h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Reply</h1>

            <label for="user id" class="mb-2 block text-sm font-medium text-gray-700">ID</label>

            <input
                type="number"
                name="contactId"
                placeholder="Enter user id . . ."
                class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />


            <label for="Your reply" class="mb-2 block text-sm font-medium text-gray-700">Reply</label>
            <textarea
                name="text"
                placeholder="Write your reply here..."
                class="h-40 w-full rounded-lg border border-gray-300 mb-3 resize-none"
            ></textarea>

            <button
                type="submit"
                class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >Send message</button
            >
            <a href="/admin/inbox" class="text-blue-400 flex items-center justify-center mt-1">Go back</a>
        </form>
    

    </div>
</div>

{/if}

