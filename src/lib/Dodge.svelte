<script lang="ts">
	import {
		randomMove,
		type Box,
		type Element,
		type Cursor,
		type Point,
		kite,
		kiteFlip
	} from './movement.js';
	import { touchPoint, rateLimit } from './helpers.js';
	import { createEventDispatcher } from 'svelte';
	type Mode = 'random' | 'kite' | 'kite-flip' | 'custom';

	export let mode: Mode = 'kite-flip';
	export let dodge = true;
	export let box: Box = { up: 0, right: 400, down: 0, left: 0 };
	export let activationDistance = 20;
	export let moveDistance = 100;
	export let duration = 0.3;
	export let rate = 0.1;
	export let customMovement: (box: Box, element: Element, cursor: Cursor) => Point = (
		box: Box,
		element: Element,
		cursor: Cursor
	) => {
		return { x: 0, y: 0 };
	};

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

	$: if(dodge === false) {
		element = {...element, x: box.left, y: box.up};
	}

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
					break;
				case 'custom':
					element = { ...element, ...customMovement(box, element, cursor) };
					break;
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
	on:transitionend={() => {
		transitioning = false;
		dispatch('transitionend')
		}}
	on:transitionstart={() => {
		transitioning = true;
		dispatch('transitionstart')
	}}
	style={`
	display: inline-block;
	transform: translate(${element.x - box.left}px, ${element.y - box.up}px);
	${duration > 0 ? `transition: ${duration}s` : ''}
	`}
>
	<slot />
</div>
