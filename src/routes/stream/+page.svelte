<script>
	import Youtube from '../../components/YouTube.svelte';
	import Layout from '../+layout.svelte';

	let player;
	let videoSlug;

	const toggle = () => {
		console.log('changing video id');
		player.loadVideoById(videoSlug);
	};
</script>

<div class="youtube-player">
	<Youtube bind:player />
</div>

<input
	class="input"
	title="Input (text)"
	type="text"
	placeholder="input text"
	bind:value={videoSlug}
/>

<button on:click={toggle}>change video</button>

<style>
	.youtube-player {
		aspect-ratio: 16/9;
	}
</style>
