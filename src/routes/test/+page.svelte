<script lang="ts">
	import Dodge from '$lib/Dodge.svelte';

	export let mode = 'kite-flip';
	export let dodge = true;
	export let debug = true;
	export let box: Box = { up: 100, right: 100, down: 100, left: 100 };
	export let activationDistance = 20;
	export let duration = 0;
	export let rate = 0;
</script>

<div class="container">
	<div class="controls">
		<h3>Mode</h3>
		<select bind:value={mode}>
			<option value="kite-flip"> kite-flip </option>
			<option value="kite"> kite </option>
			<option value="random"> random </option>
		</select>

		<h3>Dodge</h3>
		<select bind:value={dodge}>
			<option value={true}> true </option>
			<option value={false}> false </option>
		</select>

		<h3>Debug</h3>
		<select bind:value={debug}>
			<option value={true}> true </option>
			<option value={false}> false </option>
		</select>

		<h3>Box</h3>
		<div>up</div>
		<input bind:value={box.up} />
		<div>down</div>
		<input bind:value={box.down} />
		<div>left</div>
		<input bind:value={box.left} />
		<div>right</div>
		<input bind:value={box.right} />

		<h3>Activation Distance</h3>
		<input bind:value={activationDistance} />

		<h3>Duration</h3>
		<input bind:value={duration} />

		<h3>Rate</h3>
		<input bind:value={rate} />
	</div>

	<div class="cell">
		<Dodge {debug} {dodge} {mode} {box} {activationDistance} {rate} {duration}>
			<div class="test" />
		</Dodge>
	</div>
</div>

<style>
	.test {
		width: 100px;
		height: 100px;
		overflow-wrap: break-word;
	}

	.list {
		display: grid;
	}

	.controls {
		background-color: white;
		padding: 8px;
	}

	.cell {
		background-color: rgb(200, 200, 200);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 100vw;
		height: 100vh;
		display: grid;
		align-items: stretch;
		justify-items: stretch;
		grid-template-columns: auto 1fr;
	}

	:global(body) {
		margin: 0;
	}
</style>
