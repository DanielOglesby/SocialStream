<script>
	import Youtube from '../../components/YouTube.svelte';
	import Layout from '../+layout.svelte';

	let player;

	const toggle = () => {
		console.log('changing video id');
		player.loadVideoById('lS7vwED8eC8');
	};
</script>

<div class="youtube-player">
	<Youtube bind:player />
</div>

<button on:click={toggle}>change video</button>

<style>
	.youtube-player {
		width: 600px;
		aspect-ratio: 16/9;
	}
</style>
