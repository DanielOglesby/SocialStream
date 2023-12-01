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
		query,
		limit
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
		const roomDocRef = doc(db, 'rooms', roomName);
	});

	const toggle = () => {
		console.log('changing video id: ', trimmedVideoSlug);
		addVideoInstant(videoURL);
		player.loadVideoById(trimmedVideoSlug);
	};

	const addVideoInstant = async (videoUrl: string) => {
		if (!videoUrl) return null;

		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');

			// Add the new video document
			await addDoc(currentVideoCollectionRef, { videoId: videoUrl });
			console.log('Video added to currentVideo collection:', videoUrl);
		} catch (error) {
			console.error('Error adding video to currentVideo:', error);
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
