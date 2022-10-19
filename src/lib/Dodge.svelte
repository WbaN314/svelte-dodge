<script lang="ts">
	import {
		randomMove,
		rateLimit,
		type Box,
		type Element,
		type Cursor,
		kite,
		kiteFlip
	} from './utils.js';
	type Mode = 'random' | 'kite' | 'kite-flip';

	export let mode: Mode = 'kite-flip';
	export let dodge = true;
	export let box: Box = { up: 100, right: 100, down: 100, left: 100 };
	export let activationDistance = 20;
	export let duration = 0;
	export let rate = 0;

	let transitioning = false;

	let element: Element;
	let elementW: number;
	let elementH: number;
	$: element = {
		a: activationDistance,
		baseX: elementBind?.getBoundingClientRect().x,
		baseY: elementBind?.getBoundingClientRect().y,
		x: box.left,
		y: box.up,
		w: elementW,
		h: elementH
	};

	let cursor: Cursor;
	$: cursor = {
		x: 0,
		y: 0
	};

	function handleMove(e: PointerEvent) {
		updateCursorPosition(e);

		console.log(cursor);

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

	let elementBind: HTMLElement;
	function updateCursorPosition(e: PointerEvent) {
		cursor.x = e.x - element.baseX + box.left;
		cursor.y = e.y - element.baseY + box.up;
	}

	const limitedHandleMove = rateLimit(handleMove, rate);
</script>

<svelte:body on:pointermove={(e) => limitedHandleMove(e)} />

<div
	bind:clientHeight={elementH}
	bind:clientWidth={elementW}
	bind:this={elementBind}
	on:transitionend={() => (transitioning = false)}
	on:transitionstart={() => (transitioning = true)}
	style={`
	transform: translate(${element.x - box.left}px, ${element.y - box.up}px);
		${duration > 0 ? `transition: ${duration}s` : ''}
	`}
>
	<slot />
</div>
