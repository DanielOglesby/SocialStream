<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth } from '../lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log('user ', user);
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
		});
	});
</script>

<main class="mainContainer">
	<slot />
</main>

<style>
	.mainContainer {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
