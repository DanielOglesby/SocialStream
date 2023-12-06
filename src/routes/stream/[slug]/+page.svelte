<script lang="ts">
	import Youtube from '../../../components/YouTube.svelte';
	import Chat from '../../../components/Chat.svelte';
	import { trimURL } from '../../../utils/helpers';
	import { db } from '../../../firebase';
	import { doc, collection, onSnapshot, getDocs, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let player;
	let videoURL: string;
	let roomName = '';
	let currentVideo;

	onMount(() => {
		roomName = window.location.pathname.split('/')[2];
		player?.addEventListener('onStateChange', 'onPlayerStateChange');
		watchVideoMetadata();
	});

	const onPlayerStateChange = (event) => {
		if (event.data === 2) {
			console.log('Video paused');
		}
	};

	const toggle = async () => {
		updateVideo(videoURL);
	};

	const updateVideo = async (videoUrl: string) => {
		if (!videoUrl) return null;

		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');
			const currentVideoQuerySnapshot = await getDocs(currentVideoCollectionRef);
			const firstDocument = currentVideoQuerySnapshot.docs[0];

			const currentVideoDocRef = doc(currentVideoCollectionRef, firstDocument.id);

			const updateCurrentVideo = await updateDoc(currentVideoDocRef, {
				videoId: videoUrl
			});
			console.log('Updated current video:', updateCurrentVideo);
		} catch (error) {
			console.error('Error getting current video:', error);
		}
	};

	const watchVideoMetadata = async () => {
		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');
			const videoDocRef = doc(currentVideoCollectionRef, 'video'); // Reference to the 'video' document

			const unsubscribe = onSnapshot(
				videoDocRef,
				{ includeMetadataChanges: true },
				(docSnapshot) => {
					if (docSnapshot.exists()) {
						const videoMetadata = docSnapshot.data();
						console.log('Video metadata updated:', videoMetadata);
						player.loadVideoById(trimURL(videoMetadata.videoId));
					} else {
						console.log('Error: Video metadata does not exist');
					}
				}
			);
		} catch (error) {
			console.error('Error watching video metadata:', error);
		}
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
			bind:value={videoURL}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					toggle();
				}
			}}
		/>
	</div>
	<button on:click={toggle} class="btn bg-gradient-to-br variant-filled-primary"
		>change video</button
	>

	<Chat />
</main>

<style>
	.youtube-player {
		aspect-ratio: 16/9;
		min-width: 70vw;
	}
</style>
