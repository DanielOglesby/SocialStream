<script lang="ts">
	import dayjs from 'dayjs';
	import { authStore } from '../stores/authStore';
	import { db } from '../firebase';
	import { collection, doc, getDoc, query, getDocs, where, addDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let roomName: string;
	let currentMessage = '';
	let elemChat: HTMLElement;
	let currentUser: any;
	let messageFeed: Message[] = [];

	onMount(() => {
		roomName = window.location.pathname.split('/')[2];
		console.log('Room Name:', roomName);
		fetchMessages(roomName);
	});

	const fetchMessages = async (roomName: string) => {
		try {
			const querySnapshot = await getDocs(
				query(collection(db, 'rooms'), where('name', '==', roomName))
			);

			let messages: Message[] = [];

			querySnapshot.forEach(async (roomDoc) => {
				const roomId = roomDoc.id;
				const messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');
				const messagesQuerySnapshot = await getDocs(messagesCollectionRef);

				messagesQuerySnapshot.forEach((messageDoc) => {
					const messageData = messageDoc.data() as Message;
					messages = [...messages, messageData];
				});
				messageFeed = messages;
			});

			if (querySnapshot.empty) {
				console.log('No matching documents.');
			}
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const postMessage = async (roomName: string, message: Message) => {
		try {
			const roomQuerySnapshot = await getDocs(
				query(collection(db, 'rooms'), where('name', '==', roomName))
			);

			if (!roomQuerySnapshot.empty) {
				roomQuerySnapshot.forEach(async (roomDoc) => {
					const roomId = roomDoc.id;
					const messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');
					await addDoc(messagesCollectionRef, message);
					console.log('Message posted successfully:', message);
				});
			} else {
				console.log('Room not found.');
			}
		} catch (error) {
			console.error('Error posting message:', error);
		}
	};

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

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function addMessage(): void {
		let newMessage: Message = {
			id: messageFeed.length,
			name: currentUser?.email,
			timestamp: dayjs().format('MMMM D, YYYY @ h:mm A'),
			message: currentMessage,
			color: 'variant-soft-primary'
		};

		postMessage(roomName, newMessage);
		// Append the new message to the message feed
		messageFeed = [...messageFeed, newMessage];
		// Clear the textarea message
		currentMessage = '';
		// Smoothly scroll to the bottom of the feed
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}
</script>

<div bind:this={elemChat} class="overflow-y-scroll h-[30vh]">
	<div class="w-full grid grid-cols-3 gap-1">
		{#each messageFeed as message}
			<div class="bg-surface-500/30 p-4">{message.name}</div>
			<div class="bg-surface-500/30 p-4">{message.message}</div>
			<div class="bg-surface-500/30 p-4">{message.timestamp}</div>
		{/each}
	</div>
</div>

<div
	class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token fixed bottom-0"
>
	<button class="input-group-shim">+</button>
	<textarea
		bind:value={currentMessage}
		on:keydown={($event) => {
			if ($event.key === 'Enter') {
				addMessage();
			}
		}}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
		rows="1"
	/>
	<button class="variant-filled-primary" on:click={addMessage}>Send</button>
</div>
