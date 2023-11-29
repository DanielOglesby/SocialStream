<script lang="ts">
	import dayjs from 'dayjs';
	import { getAuth } from 'firebase/auth';
	import { authStore } from '../stores/authStore';

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

	$: messageFeed = [
		{
			id: 0,
			name: 'Chloe',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 1,
			name: 'Michael',
			timestamp: 'Yesterday @ 2:45pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 2,
			name: 'Michael',
			timestamp: 'Yesterday @ 2:45pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		}
	];

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
