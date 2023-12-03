<script>
	import { authHandlers, authStore } from '../stores/authStore';

	let register = false;
	let email = '';
	let password = '';
	let confirmPassword = '';

	async function handleSubmit() {
		if (!email || !password || (register && !confirmPassword)) {
			return;
		}

		if (register && password === confirmPassword) {
			try {
				await authHandlers.signup(email, password);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await authHandlers.login(email, password);
			} catch (err) {
				console.log(err);
			}
		}
		if ($authStore.currentUser) {
			window.location.href = '/find-a-room';
		}
	}
</script>

<div class="container">
	<h1 class="text-xl">{register ? 'Register' : 'Log in'}</h1>
	<form class="gap-2">
		<label>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>
		{#if register}
			<label>
				<input bind:value={confirmPassword} type="password" placeholder="Confirm Password" />
			</label>
		{/if}
		<button on:click={handleSubmit} type="button" class="btn variant-filled-primary">Submit</button>
	</form>
	{#if register}
		<div
			on:click={() => {
				register = false;
			}}
			on:keydown={() => {}}
		>
			Already have an account?
			<p>Log in</p>
		</div>
	{:else}
		<div
			class="flex items-center flex-col"
			on:click={() => {
				register = true;
			}}
			on:keydown={() => {}}
		>
			Don't have an account?
			<p>Sign Up</p>
		</div>
		<div
			on:click={() => {
				authHandlers.resetPassword(email);
			}}
			on:keydown={() => {}}
		>
			Forgot Password?
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.container form {
		display: flex;
		flex-direction: column;
		color: black;
	}
</style>
