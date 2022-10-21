<script lang="ts">
	import Dodge from '$lib/Dodge.svelte';

	let mode = 'kite-flip';
	let dodge = true;
	let debug = true;
	let box: Box = { up: 100, right: 100, down: 100, left: 100 };
	let activationDistance = 20;
	let duration = 0.3;
	let rate = 0.1;
	let moveDistance = 100;

	let width = 100;
	let height = 100;

	let rerender = false;
</script>

<div class="container">
	<div class="controls">
		<h1>Box</h1>

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

		<h3>Box</h3>
		<div>up</div>
		<input type="number" bind:value={box.up} />
		<div>down</div>
		<input type="number" bind:value={box.down} />
		<div>left</div>
		<input type="number" bind:value={box.left} />
		<div>right</div>
		<input type="number" bind:value={box.right} />

		<h3>Activation Distance</h3>
		<input type="number" bind:value={activationDistance} />

		<h3>Move Distance</h3>
		<input type="number" bind:value={moveDistance} />

		<h3>Duration</h3>
		<input type="number" bind:value={duration} />

		<h3>Rate</h3>
		<input type="number" bind:value={rate} />

		<h1>Element</h1>

		<h3>Size</h3>
		<div>width</div>
		<input bind:value={width} />
		<div>height</div>
		<input bind:value={height} />
	</div>

	{#key rerender}
		<div class="cell">
			<div
				class="debug"
				style={`
		 padding: ${box.up}px ${box.right}px ${box.down}px ${box.left}px
		 `}
			>
				<Dodge {debug} {dodge} {mode} {box} {activationDistance} {rate} {duration} {moveDistance}
				on:move={() => console.log('move')}
				on:transitionend={() => console.log('transitionend')}
				on:transitionstart={() => console.log('transitionstart')}
				>
					<div class="test" style:width={`${width}px`} style:height={`${height}px`} />
				</Dodge>
			</div>
		</div>
	{/key}
</div>

<style>
	.test {
		width: 100px;
		height: 100px;
		overflow-wrap: break-word;
		background-color: green;
	}

	.debug {
		background-color: rgb(255, 0, 0, 0.2);
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
