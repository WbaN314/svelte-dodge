<script lang="ts">
	import Dodge from '$lib/Dodge.svelte';

	let username: String = '';
	let password: String = '';
	let warning = 0;
	let login = false;

	let timeout: NodeJS.Timeout;
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
				<span class={`warning ${warning >= 2 ? 'shakeY' : ''}`}>Enter your password</span>
			{/if}
		</div>
		<input type="password" bind:value={password} on:input={() => (warning = 0)} />
	</div>
	<div>
		<Dodge
			box={{ up: 0, left: 0, right: 600, down: 0 }}
			dodge={!(username?.length > 0 && password?.length > 0)}
			on:move={() => {
				clearTimeout(timeout);
				warning += 1;
				timeout = setTimeout(() => {
					warning = 0;
				}, 5000);
			}}
			on:transitionend={() => {
				if (warning >= 2) {
					warning = 1;
				}
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
		display: inline-block;
		color: red;
	}

	.success {
		color: green;
	}

	@keyframes shakeY {
		from,
		to {
			transform: translate3d(0, 0, 0);
		}

		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translate3d(0, -10px, 0);
		}

		20%,
		40%,
		60%,
		80% {
			transform: translate3d(0, 10px, 0);
		}
	}

	.shakeY {
		animation-name: shakeY;
		animation-duration: 1s;
	}
</style>
