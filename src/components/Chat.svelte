<script lang="ts">
	import dayjs from 'dayjs';
	import { getAuth } from 'firebase/auth';

	const auth = getAuth();
	const user = auth.currentUser;

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
		const newMessage: Message = {
			id: messageFeed.length,
			name: user?.email,
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

<div bind:this={elemChat} class="overflow-y-auto">
	<div class="w-full grid grid-cols-[auto_1fr] gap-1">
		{#each messageFeed as message}
			<div class="bg-surface-500/30 p-4">{message.name}</div>
			<div class="bg-surface-500/30 p-4">{message.message}</div>
		{/each}
	</div>
</div>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
	<button class="input-group-shim">+</button>
	<textarea
		bind:value={currentMessage}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
		rows="1"
	/>
	<button class="variant-filled-primary" on:click={addMessage}>Send</button>
</div>
