<script lang="ts">
	import Youtube from '../../../components/YouTube.svelte';
	import Chat from '../../../components/Chat.svelte';
	import { trimURL } from '../../../utils/helpers';
	import { db } from '../../../firebase';
	import {
		doc,
		setDoc,
		collection,
		addDoc,
		onSnapshot,
		orderBy,
		getDocs,
		getDoc,
		query,
		limit,
		updateDoc
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	let player;
	let videoURL: string;
	let trimmedVideoSlug = '';
	let roomName = '';
	let currentVideo;
	$: if (videoURL) trimmedVideoSlug = trimURL(videoURL);

	onMount(() => {
		roomName = window.location.pathname.split('/')[2];
	});

	const toggle = async () => {
		updateVideo(videoURL);
		currentVideo = await getCurrentVideo();
		player.loadVideoById(trimURL(currentVideo));
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
		} catch (error) {
			console.error('Error getting current video:', error);
		}
	};

	const getCurrentVideo = async () => {
		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');
			const currentVideoQuerySnapshot = await getDocs(currentVideoCollectionRef);
			const firstDocument = currentVideoQuerySnapshot.docs[0];

			const docRef = doc(currentVideoCollectionRef, firstDocument.id);
			const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
				if (docSnapshot.exists()) {
					console.log('HERE');
					const videoId = docSnapshot.data().videoId;
					currentVideo = videoId;
					console.log('Updated current video:', currentVideo);
				} else {
					console.log('Error: Failed to update current video');
				}
			});

			unsubscribe();

			return firstDocument.exists ? firstDocument.data().videoId : null;
		} catch (error) {
			console.error('Error getting current video:', error);
			return null;
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
