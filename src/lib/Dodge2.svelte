<script lang="ts">
	import {
		randomMove,
		rateLimit,
		type Box,
		type Element,
		type Cursor,
		kite,
		kiteFlip,
	} from './utils.js';

	type Mode = 'random' | 'kite' | 'kite-flip';

	export let mode: Mode = 'kite-flip';
	export let dodge = true;
	export let debug = false;
	export let box: Box = { up: 100, right: 100, down: 100, left: 100 };
	export let activationDistance = 20;
	export let duration = 0;
	export let rate = 0;

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
		w: elementW,
		h: elementH
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
					element = { ...element, ...randomMove(box, element, cursor) };
					break;
				case 'kite':
					element = { ...element, ...kite(box, element, cursor) };
					break;
				case 'kite-flip':
					element = { ...element, ...kiteFlip(box, element, cursor) };
			}
		}
	}

	let areaBind: HTMLElement;
	function updateCursorPosition(e: PointerEvent) {
		cursor.x = e.x - areaBind.getBoundingClientRect().x;
		cursor.y = e.y - areaBind.getBoundingClientRect().y;
	}

	const limitedHandleMove = rateLimit(handleMove, rate);
	const limitedUpdateCursorPosition = rateLimit(updateCursorPosition, rate);
</script>

<svelte:body on:pointermove={(e) => handleMove(e)}/>

<div
    bind:clientHeight={elementH}
    bind:clientWidth={elementW}
    on:transitionend={() => transitioning = false}
    on:transitionstart={() => transitioning = true}
    >
    <slot/>
</div>
