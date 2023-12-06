<script>
	import { onMount } from 'svelte';
	import { db } from '../firebase';
	import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	export let player;
	export let initialVideoId = '';
	export let onPlayerReady = () => {};
	export let onPlayerStateChange = () => {};

	const ytPlayerId = 'youtube-player';

	function loadPlayer() {
		return new Promise((resolve, reject) => {
			if (window.YT && typeof window.YT.Player === 'function') {
				resolve();
			} else {
				const tag = document.createElement('script');
				tag.src = 'https://www.youtube.com/iframe_api';
				const firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				window.onYouTubeIframeAPIReady = resolve;
			}
		});
	}

	onMount(async () => {
		await loadPlayer();

		player = new YT.Player(ytPlayerId, {
			height: '100%',
			width: '100%',
			videoId: initialVideoId,
			playerVars: { autoplay: 1 },
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		});
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div id={ytPlayerId} class="youtube-player" />

<style>
	.youtube-player {
		width: 100%;
		height: 100%;
	}
</style>
