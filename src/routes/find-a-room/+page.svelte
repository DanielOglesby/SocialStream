<script>
	let roomName = '';

	function handleEnterRoomClick() {
		console.log('roomName ', roomName);
		window.location.href = `/stream/${roomName}`;
	}
</script>

<div class="flex justify-center text-black items-center h-screen flex-col gap-10">
	<input
		class="input"
		title="Input (text)"
		type="text"
		placeholder="Choose the name of your room"
		bind:value={roomName}
	/>
	<button
		type="button"
		class="btn bg-gradient-to-br variant-gradient-primary-secondary"
		on:click={handleEnterRoomClick}>Enter Room</button
	>
</div>
