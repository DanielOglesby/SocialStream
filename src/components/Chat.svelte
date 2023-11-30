<script lang="ts">
	import dayjs from 'dayjs';
	import { authStore } from '../stores/authStore';
	import { db } from '../firebase';
	import { collection, doc, getDoc, query, getDocs, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let roomName;

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

			querySnapshot.forEach(async (roomDoc) => {
				const messagesCollectionRef = collection(db, 'rooms', roomDoc.id, 'messages');
				const messagesQuerySnapshot = await getDocs(messagesCollectionRef);

				messagesQuerySnapshot.forEach((messageDoc) => {
					console.log('Message data:', messageDoc.data());
				});
			});

			if (querySnapshot.empty) {
				console.log('No matching documents.');
			}
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

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

	$: messageFeed = [];

	$: console.log(messageFeed);

	let currentMessage = '';
	let elemChat: HTMLElement;

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
	<div class="w-full grid grid-cols-[auto_1fr] gap-1">
		{#each messageFeed as message}
			<div class="bg-surface-500/30 p-4">{message.name}</div>
			<div class="bg-surface-500/30 p-4">{message.message}</div>
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
