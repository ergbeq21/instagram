<script>
	const { message } = $props();
</script>

<div>
	<p>{message}</p>
</div>

<style>
	div {
		background-color: red;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
		padding: 10px;
		margin: 10px;
	}
	p {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
