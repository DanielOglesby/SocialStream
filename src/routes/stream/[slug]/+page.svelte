<script lang="ts">
	import Youtube from '../../../components/YouTube.svelte';
	import Chat from '../../../components/Chat.svelte';
	import { trimURL } from '../../../utils/helpers';
	import { db } from '../../../firebase';
	import { doc, collection, onSnapshot, getDocs, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Slider from '../../../components/Slider.svelte';

	let player;
	let videoURL: string;
	let roomName = '';
	let currentVideo;
	let duration = 0;
	let timeChosen = 0;

	onMount(() => {
		roomName = window.location.pathname.split('/')[2];
		watchVideoMetadata();
	});

	const toggle = async () => {
		updateVideo(videoURL);
	};

	const onPlayerReady = () => {
		console.log('Player is ready');
	};

	const onPlayerStateChange = (event) => {
		duration = player?.getDuration();
		console.log('Duration: ', duration);
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
			const videoDocRef = doc(currentVideoCollectionRef, 'video');

			const unsubscribe = onSnapshot(
				videoDocRef,
				{ includeMetadataChanges: true },
				(docSnapshot) => {
					if (docSnapshot.exists()) {
						const videoMetadata = docSnapshot.data();
						console.log('Refreshed video metadata:', videoMetadata);

						// Check if the document has the timestamp field and it has changed
						if (
							videoMetadata &&
							videoMetadata.timestamp !== undefined &&
							videoMetadata.timestamp !== timeChosen
						) {
							setTimeout(() => {
								player?.seekTo(videoMetadata.timestamp);
								player?.playVideo();
								console.log('Seeking to new timestamp', videoMetadata.timestamp);
							}, 1000);
						}

						if (videoMetadata) {
							player?.loadVideoById(trimURL(videoMetadata.videoId));
						}
					}
				}
			);
		} catch (error) {
			console.error('Error refreshing video metadata:', error);
		}
	};

	async function handleSliderChange(timeChosen) {
		console.log('Seeking player to:', timeChosen);

		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');
			const currentVideoQuerySnapshot = await getDocs(currentVideoCollectionRef);
			const firstDocument = currentVideoQuerySnapshot.docs[0];

			const currentVideoDocRef = doc(currentVideoCollectionRef, firstDocument.id);

			const updateCurrentVideo = await updateDoc(currentVideoDocRef, {
				timestamp: timeChosen
			});
			player?.seekTo(timeChosen);

			console.log('Updated timestamp: ', updateCurrentVideo);
		} catch (error) {
			console.error('Error updating timestamp: ', error);
		}
	}
</script>

<main class="flex items-center justify-center flex-col gap-10">
	<div class="youtube-player">
		<Youtube bind:player {onPlayerReady} {onPlayerStateChange} />
	</div>
	<Slider bind:value={timeChosen} max={duration} on:change={() => handleSliderChange(timeChosen)} />

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
