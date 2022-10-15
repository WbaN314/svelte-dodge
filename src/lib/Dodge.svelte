<script lang="ts">
	import {
		randomMove,
		randomMoveAway,
		rateLimit,
		type Box,
		type Element,
		type Cursor,
		inside,
		kite
	} from './utils.js';

	type Mode = 'random' | 'random-away' | 'kite';

	export let mode: Mode = 'random-away';
	export let dodge = true;
	export let debug = false;
	export let box: Box = { up: 100, right: 100, down: 100, left: 100 };
	export let activationDistance = 20;
	export let duration = 0.01;
	export let rate = 10;

	let transitioning = false;

	let dummyW: number;
	let dummyH: number;

	let element: Element;
	let elementW: number;
	let elementH: number;

	$: element = {
		a: activationDistance,
		x: box.left - activationDistance,
		y: box.up - activationDistance,
		w: Math.max(elementW, dummyW),
		h: Math.max(elementH, dummyH)
	};

	let cursor: Cursor;
	$: cursor = {
		x: 0,
		y: 0,
	};

	function handleMove() {
		if (dodge && !transitioning) {
			switch (mode) {
				case 'random':
					element = { ...element, ...randomMove(box, element) };
					break;
				case 'random-away':
					element = { ...element, ...randomMoveAway(box, element, cursor) };
					break;
				case 'kite':
					element = { ...element, ...kite(box, element, cursor) };
					break;
			}
		}
	}

	$: areaW = box.left + element.w + box.right;
	$: areaH = box.down + element.h + box.up;

	let areaBind: HTMLElement;
	function updateCursorPosition(e: PointerEvent) {
		cursor.x = e.x - areaBind.getBoundingClientRect().x;
		cursor.y = e.y - areaBind.getBoundingClientRect().y;
	}

	const limitedHandleMove = rateLimit(handleMove, rate);
	const limitedUpdateCursorPosition = rateLimit(updateCursorPosition, rate);
</script>

<div
	class="dummy"
	style={`
  background-color: ${debug ? 'rgb(255,0,0)' : 'inherit'};
  min-width: ${element.w}px; 
  min-height: ${element.h}px;
  `}
	bind:clientHeight={dummyH}
	bind:clientWidth={dummyW}
>
	<div
		class="area"
		style={`
        background-color: ${debug ? 'rgb(255,0,0,0.2)' : 'inherit'};
        width: ${areaW}px;
        height: ${areaH}px;
        transform: translate(
            -${box.left}px,
            -${box.up}px
        )
    `}
		bind:this={areaBind}
		on:pointermove={(e) => limitedUpdateCursorPosition(e)}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			style={`
        background-color: ${debug ? 'rgb(0,128,0,0.2)' : 'inherit'};
        padding: ${activationDistance}px;
        position: absolute;
        left: ${element.x}px;
        top: ${element.y}px;
        transition: ${duration}s
        `}
			on:transitionstart|self={() => (transitioning = true)}
			on:transitionend|self={() => {
				transitioning = false;
				if (inside(cursor, element)) {
					handleMove();
				}
			}}
			on:pointermove={limitedHandleMove}
			on:click={limitedHandleMove}
		>
			<div
				style={`
        ${element.w ? `width: ${element.w}px` : ``};
        ${element.h ? `height: ${element.h}px` : ``};
        display: grid;
        justify-content: stretch;
        align-items: stretch;
        background-color: ${debug ? 'rgb(0,128,0)' : 'inherit'};
        `}
				bind:clientHeight={elementH}
				bind:clientWidth={elementW}
			>
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
	.dummy {
		position: relative;
		background-color: red;
	}

	.area {
		position: absolute;
		display: flex;
		align-items: flex-start;
	}
</style>
