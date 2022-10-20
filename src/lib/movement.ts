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
			x = mod(cursor.x + element.a, box.left + box.right);
		} else if (tp === 'r' || tp === 'mr' || tp === 'br' || tp === 'tr')
			x = mod(cursor.x - element.w - element.a, box.left + box.right);
		if (tp === 't' || tp === 'mt' || tp === 'tl' || tp === 'tr') {
			y = mod(cursor.y + element.a, box.up + box.down);
		} else if (tp === 'b' || tp === 'mb' || tp === 'bl' || tp === 'br') {
			y = mod(cursor.y - element.h - element.a, box.up + box.down);
		}
	} else if (box.left + box.right > element.w) {
		if (cursor.x <= m.x) {
			x = mod(cursor.x + element.a, box.left + box.right);
		} else {
			x = mod(cursor.x - element.w - element.a, box.left + box.right);
		}
	} else if (box.up + box.down > element.h) {
		if (cursor.y <= m.y) {
			y = mod(cursor.y + element.a, box.up + box.down);
		} else {
			y = mod(cursor.y - element.h - element.a, box.up + box.down);
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
			x = cursor.x + element.a
			if (x > box.left + box.right) {
				x = cursor.x - element.w - element.a
			}
		} else if (tp === 'r' || tp === 'mr' || tp === 'br' || tp === 'tr') {
			x = cursor.x - element.w - element.a;
			if (x < 0) {
				x = cursor.x + element.a;
			}
		}
		if (tp === 't' || tp === 'mt' || tp === 'tl' || tp === 'tr') {
			y = cursor.y + element.a
			if (y > box.up + box.down) {
				y = cursor.y - element.h - element.a
			}
		} else if (tp === 'b' || tp === 'mb' || tp === 'bl' || tp === 'br') {
			y = cursor.y - element.h - element.a;
			if (y < 0) {
				y = cursor.y + element.a;
			}
		}
	} else if (box.left + box.right > element.w) {
		if (cursor.x <= m.x) {
			x = cursor.x + element.a
			if (x > box.left + box.right) {
				x = cursor.x - element.w - element.a
			}
		} else {
			x = cursor.x - element.w - element.a;
			if (x < 0) {
				x = cursor.x + element.a;
			}
		}
	} else if (box.up + box.down > element.h) {
		if (cursor.y <= m.y) {
			y = cursor.y + element.a
			if (y > box.up + box.down) {
				y = cursor.y - element.h - element.a
			}
		} else {
			y = cursor.y - element.h - element.a;
			if (y < 0) {
				y = cursor.y + element.a;
			}
		}
	}
	return { x, y };
}


