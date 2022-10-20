<script lang="ts">
	import {
		randomMove,
		rateLimit,
		type Box,
		type Element,
		type Cursor,
		type Point,
		kite,
		kiteFlip,
		touchPoint
	} from './utils.js';
	import { createEventDispatcher } from 'svelte';
	type Mode = 'random' | 'kite' | 'kite-flip' | 'custom';

	export let mode: Mode = 'kite-flip';
	export let dodge = true;
	export let box: Box = { up: 0, right: 100, down: 100, left: 0 };
	export let activationDistance = 20;
	export let moveDistance = 0;
	export let duration = 0;
	export let rate = 0;
	export let customMovement: (Box, Element, Cursor) => Point

	let transitioning = false;

	const dispatch = createEventDispatcher();

	let element: Element;
	let elementW: number;
	let elementH: number;
	$: element = {
		m: moveDistance,
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
		if (!touchPoint(element, cursor)) {
			return;
		}
		if (dodge && !transitioning) {
			dispatch('move');
			switch (mode) {
				case 'random':
					element = { ...element, ...randomMove(box, element, cursor) };
					break;
				case 'kite':
					element = { ...element, ...kite(box, element, cursor) };
					break;
				case 'kite-flip':
					element = { ...element, ...kiteFlip(box, element, cursor) };
				case 'custom':
					element = { ...element, ...customMovement(box, element, cursor) };
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

<svelte:window on:pointermove={(e) => limitedHandleMove(e)} />

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
