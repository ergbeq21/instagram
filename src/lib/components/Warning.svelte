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
		height: 10px;
		padding: 13px;
		margin: 10px;
	}
	p {
		font-family: 'Courier New', Courier, monospace;
		font-size: 13px;
	}
</style>
