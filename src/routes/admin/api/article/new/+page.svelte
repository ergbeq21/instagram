<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';
	let { form } = $props();
</script>

<main class="flex h-screen items-center justify-center bg-green-100 p-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
		<h1 class="mb-6 text-xl font-semibold">Create Article</h1>
		<form
			action="?/createArticle"
			method="POST"
			class="space-y-4"
			use:enhance
			enctype="multipart/form-data"
		>
			<input type="file" name="image" class="w-full rounded-lg border border-gray-300 p-2" />
			<input
				type="text"
				name="author"
				placeholder="Author"
				class="w-full rounded-lg border border-gray-300 p-2"
			/>
			<textarea
				name="description"
				placeholder="Write you description here . . ."
				class="h-50 w-full rounded-lg border border-gray-300 p-2"
			></textarea>
			<button
				type="submit"
				class="w-full rounded-lg bg-green-500 py-2 text-white transition hover:bg-green-600"
			>
				Upload my Article
			</button>
			<a href="/admin/api/article" class="text-green-500">Go back</a>
		</form>
	</div>
</main>
