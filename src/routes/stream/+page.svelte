<script lang="ts">
	import Youtube from '../../components/YouTube.svelte';
	import { trimURL } from '../../utils/helpers';

	let player;
	let videoSlug;
	let trimmedVideoSlug = '';
	$: if (videoSlug) trimmedVideoSlug = trimURL(videoSlug);

	const toggle = () => {
		console.log('changing video id');
		player.loadVideoById(trimmedVideoSlug);
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
