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

<main
	class="flex items-center justify-center h-screen flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8"
>
	<div class="youtube-player">
		<Youtube bind:player />
	</div>

	<input
		class="input"
		title="Input (text)"
		type="text"
		placeholder="Input YouTube video URL"
		bind:value={videoSlug}
	/>

	<button on:click={toggle}>change video</button>
</main>

<style>
	.youtube-player {
		aspect-ratio: 16/9;
		min-width: 400px;
	}
</style>
