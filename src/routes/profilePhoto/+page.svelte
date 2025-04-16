<script>
    let {data,form} = $props();
</script>


<main class="flex h-screen items-center justify-center bg-green-100 p-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
		<h1 class="mb-6 text-xl font-semibold">Change profile picture</h1>
		<form
			action="?/changeProfilePicture"
			method="POST"
			class="space-y-4"
			use:enhance
			enctype="multipart/form-data"
		>
			<input type="file" name="image" class="w-full rounded-lg border border-gray-300 p-2" />
            <input type="hidden" value={data.user.id} name="userID">
			
			<button
				type="submit"
				class="w-full rounded-lg bg-green-500 py-2 text-white transition hover:bg-green-600"
			>
				Save changes
			</button>
			<a href="/profile" class="text-green-400">Go back</a>
		</form>
	</div>
</main>