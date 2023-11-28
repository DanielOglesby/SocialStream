<script lang="ts">
	import Youtube from '../../../components/YouTube.svelte';
	import Chat from '../../../components/Chat.svelte';
	import { trimURL } from '../../../utils/helpers';

	let player;
	let videoSlug: string;
	let trimmedVideoSlug = '';
	$: if (videoSlug) trimmedVideoSlug = trimURL(videoSlug);

	const toggle = () => {
		console.log('changing video id');
		player.loadVideoById(trimmedVideoSlug);
	};
</script>

<main class="flex items-center justify-center flex-col gap-10">
	<div class="youtube-player">
		<Youtube bind:player />
	</div>

	<div class="w-[50vw]">
		<input
			class="input"
			title="Input (text)"
			type="text"
			placeholder="Input YouTube video URL"
			bind:value={videoSlug}
		/>
	</div>
	<button on:click={toggle}>change video</button>

	<Chat />
</main>

<style>
	.youtube-player {
		aspect-ratio: 16/9;
		min-width: 70vw;
	}
</style>
