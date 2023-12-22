<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { getDrawerStore, storePopup, Drawer } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth } from '../firebase';
	import { authStore } from '../stores/authStore';
	import { initializeStores } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log('user ', user);
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
		});
	});

	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		bgDrawer: 'bg-purple-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};

	function handleDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<Drawer>
	<div class="flex flex-col items-center justify-center text-3xl h-full">
		<a class="mb-4 hover:text-green-400" href="/">Log In</a>
		<a class="mb-4 hover:text-green-400" href="/about">About this site</a>
		<a class="mb-4 hover:text-green-400" href="/guide">User Guide</a>
	</div>
</Drawer>
<main class="mainContainer h-screen flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
	<div>
		<button type="button" class="btn variant-filled-primary" on:click={handleDrawer}
			>Open Drawer</button
		>
	</div>
	<slot />
</main>

<style>
	.mainContainer {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
