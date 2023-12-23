<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { getDrawerStore, storePopup, Drawer } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth } from '../firebase';
	import { authStore } from '../stores/authStore';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Hamburger from '../components/Hamburger.svelte';
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
		width: 'w-full',
		height: 'h-full',
		padding: 'p-0',
		rounded: 'rounded-none'
	};

	function handleDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<Drawer>
	<div class="ml-10 mt-10">
		<button on:click={() => drawerStore.close()}>
			<Hamburger />
		</button>
	</div>
	<div class="flex flex-col items-center justify-center text-3xl h-full">
		<a class="mb-4 hover:text-green-400" href="/" on:click={() => drawerStore.close()}>Log In</a>
		<a class="mb-4 hover:text-green-400" href="/about" on:click={() => drawerStore.close()}>About</a
		>
		<a class="mb-4 hover:text-green-400" href="/guide" on:click={() => drawerStore.close()}
			>User Guide</a
		>
	</div>
</Drawer>

<main class="mainContainer h-screen flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
	<div>
		<button type="button" class="btn" on:click={handleDrawer}><Hamburger></Hamburger> </button>
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
