import { midpoint, mod, touchPoint } from "./helpers.js";

export interface Point {
	x: number;
	y: number;
}

export interface Square {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Box {
	up: number;
	right: number;
	down: number;
	left: number;
}

export interface Element extends Square {
	a: number;
	m: number;
	baseX: number;
	baseY: number;
}

export interface Cursor {
	x: number;
	y: number;
}

export function randomMove(box: Box, element: Element, cursor: Cursor): Point {
	let x = element.x;
	let y = element.y;
	let tp = touchPoint(element, cursor);
	
	if (tp) {
		if (box.left + box.right > element.w) {
			x = mod(
				Math.round(Math.random() * (box.left + box.right - element.w) + cursor.x),
				box.left + box.right
			);
		}
		if (box.up + box.down > element.h) {
			y = mod(
				Math.round(Math.random() * (box.up + box.down - element.h) + cursor.y),
				box.up + box.down
			);
		}
	}
	return { x, y };
}

export function kite(box: Box, element: Element, cursor: Cursor) {
	let x = element.x;
	let y = element.y;
	let m = midpoint(element);
	let tp = touchPoint(element, cursor);

	if (box.left + box.right > 0 && box.up + box.down > 0) {
		if (tp === 'l' || tp === 'ml' || tp === 'bl' || tp === 'tl') {
			x = mod(cursor.x + element.a + element.m, box.left + box.right);
		} else if (tp === 'r' || tp === 'mr' || tp === 'br' || tp === 'tr')
			x = mod(cursor.x - element.w - element.a - element.m, box.left + box.right);
		if (tp === 't' || tp === 'mt' || tp === 'tl' || tp === 'tr') {
			y = mod(cursor.y + element.a + element.m, box.up + box.down);
		} else if (tp === 'b' || tp === 'mb' || tp === 'bl' || tp === 'br') {
			y = mod(cursor.y - element.h - element.a - element.m, box.up + box.down);
		}
	} else if (box.left + box.right > element.w) {
		if (cursor.x <= m.x) {
			x = mod(cursor.x + element.a + element.m, box.left + box.right);
		} else {
			x = mod(cursor.x - element.w - element.a - element.m, box.left + box.right);
		}
	} else if (box.up + box.down > element.h) {
		if (cursor.y <= m.y) {
			y = mod(cursor.y + element.a + element.m, box.up + box.down);
		} else {
			y = mod(cursor.y - element.h - element.a - element.m, box.up + box.down);
		}
	}
	return { x, y };
}

export function kiteFlip(box: Box, element: Element, cursor: Cursor) {
	let x = element.x;
	let y = element.y;
	let m = midpoint(element);
	let tp = touchPoint(element, cursor);

	if (box.left + box.right > element.w && box.up + box.down > element.h) {
		if (tp === 'l' || tp === 'ml' || tp === 'bl' || tp === 'tl') {
			x = cursor.x + element.a + element.m
			if (x > box.left + box.right) {
				x = Math.max(cursor.x - element.w - element.a - element.m, 0)
			}
		} else if (tp === 'r' || tp === 'mr' || tp === 'br' || tp === 'tr') {
			x = cursor.x - element.w - element.a - element.m;
			if (x < 0) {
				x = Math.min(cursor.x + element.a + element.m, box.left + box.right);
			}
		}
		if (tp === 't' || tp === 'mt' || tp === 'tl' || tp === 'tr') {
			y = cursor.y + element.a + element.m
			if (y > box.up + box.down) {
				y = Math.max(cursor.y - element.h - element.a - element.m, 0)
			}
		} else if (tp === 'b' || tp === 'mb' || tp === 'bl' || tp === 'br') {
			y = cursor.y - element.h - element.a - element.m;
			if (y < 0) {
				y = Math.min(cursor.y + element.a + element.m, box.up + box.down);
			}
		}
	} else if (box.left + box.right > element.w) {
		if (cursor.x <= m.x) {
			x = cursor.x + element.a + element.m
			if (x > box.left + box.right) {
				x = Math.max(cursor.x - element.w - element.a - element.m, 0)
			}
		} else {
			x = cursor.x - element.w - element.a - element.m;
			if (x < 0) {
				x = Math.min(cursor.x + element.a + element.m, box.left + box.right);
			}
		}
	} else if (box.up + box.down > element.h) {
		if (cursor.y <= m.y) {
			y = cursor.y + element.a + element.m
			if (y > box.up + box.down) {
				y = Math.max(cursor.y - element.h - element.a - element.m, 0)
			}
		} else {
			y = cursor.y - element.h - element.a - element.m;
			if (y < 0) {
				y = Math.min(cursor.y + element.a + element.m, box.up + box.down);
			}
		}
	}
	return { x, y };
}


