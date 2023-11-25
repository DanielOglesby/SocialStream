<script lang="ts">
	import dayjs from 'dayjs';
	import { db } from '../../firebase';
	import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
	import { authStore } from '../../stores/authStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let roomName = '';
	let currentUser: any;

	const unsubscribe = authStore.subscribe((authState) => {
		console.log('Current User:', authState.currentUser);
		currentUser = authState.currentUser;
	});

	type Message = {
		id: number;
		name: any;
		timestamp: string;
		message: string;
		color: string;
	};

	async function handleEnterRoomClick() {
		console.log('roomName ', roomName);
		if (roomName === '') {
			alert('Enter a valid room name');
			return;
		}

		try {
			const roomDocRef = doc(db, 'rooms', roomName);
			await setDoc(roomDocRef, { name: roomName });

			const messagesCollectionRef = collection(roomDocRef, 'messages');
			const newMessage: Message = {
				id: 1,
				name: 'Admin',
				timestamp: dayjs().format('MMMM D, YYYY @ h:mm:ss A'),
				message: 'Welcome to the room, ' + currentUser?.email + '!',
				color: 'blue'
			};
			const currentVideoCollectionRef = collection(roomDocRef, 'currentVideo');

			const currentVideoSnapshot = await getDocs(currentVideoCollectionRef);
			if (currentVideoSnapshot.empty) {
				const newVideo = {
					videoId: '',
					timestamp: 0
				};

				await setDoc(doc(currentVideoCollectionRef, 'video'), newVideo);
				console.log('Added initial video:', newVideo);
			}
			await addDoc(messagesCollectionRef, newMessage);
			console.log('Added initial message:', newMessage);

			window.location.href = `/stream/${roomName}`;
		} catch (error) {
			console.error('Error creating room:', error);
		}
	}
</script>

<div class="flex justify-center text-black items-center h-screen flex-col gap-10">
	<input
		class="input text-white"
		title="Input (text)"
		type="text"
		placeholder="Choose the name of your room"
		bind:value={roomName}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleEnterRoomClick();
			}
		}}
	/>
	<button
		type="button"
		class="btn bg-gradient-to-br variant-filled-primary"
		on:click={handleEnterRoomClick}>Enter Room</button
	>
</div>
