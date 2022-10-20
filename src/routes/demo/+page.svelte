<script lang="ts">
	import Dodge from '$lib/Dodge.svelte';

	let username: String;
	let password: String;
	let warning = false;
	let login = false;

	let timeout;
</script>

<div class="outside">
	<div>
		<div>Username:</div>
		<input type="text" bind:value={username} />
	</div>
	<div>
		<div>
			Password:
			{#if warning}
				<span class="warning">Enter your password</span>
			{/if}
		</div>
		<input type="password" bind:value={password} />
	</div>
	<div>
		<Dodge
			dodge={!(username?.length > 0 && password?.length > 0)}
			on:move={() => {
				clearTimeout(timeout);
				warning = true;
				timeout = setTimeout(() => {
					warning = false;
				}, 5000);
			}}
		>
			<button
				on:click={() => {
					if (username?.length > 0 && password?.length > 0) {
						login = true;
					}
				}}
			>
				Login
			</button>
			{#if login}
				<span class="success">Successful</span>
			{/if}
		</Dodge>
	</div>
</div>

<style>
	.outside {
		margin: 8px;
	}

	.outside > div {
		margin-bottom: 12px;
	}

	.warning {
		color: red;
	}

	.success {
		color: green;
	}
</style>
