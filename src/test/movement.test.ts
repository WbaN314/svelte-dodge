import { touchPoint } from '$lib/helpers.js';
import { describe, expect, test } from 'vitest';
import {
	type Cursor,
	randomMove,
	type Box,
	type Element,
	kite,
	kiteFlip
} from '../lib/movement.js';

describe('Utils', () => {
	test('randomMove', () => {
		let box: Box = { up: 100, right: 200, left: 300, down: 400 };
		let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100, baseX: 0, baseY: 0 };

		let cursor: Cursor = { x: 0, y: 0 };
		for (let i = 0; i < 100; i++) {
			let { x, y } = randomMove(box, element, cursor);
			expect(x).toBeGreaterThanOrEqual(element.x);
			expect(x).toBeLessThanOrEqual(box.left + box.right);
			expect(y).toBeGreaterThanOrEqual(element.y);
			expect(y).toBeLessThanOrEqual(box.up + box.down);
		}

		cursor = { ...cursor, x: 100, y: 100 };
		for (let i = 0; i < 100; i++) {
			let { x, y } = randomMove(box, element, cursor);
			expect(x).toSatisfy((x: number) => x >= 100 || x <= 100 - element.w);
			expect(y).toSatisfy((y: number) => y >= 100 || y <= 100 - element.h);
			expect(x).toBeGreaterThanOrEqual(0);
			expect(x).toBeLessThanOrEqual(box.left + box.right);
			expect(y).toBeGreaterThanOrEqual(0);
			expect(y).toBeLessThanOrEqual(box.up + box.down);
		}

		for (let i = 0; i < 100; i++) {
			let cursorX = Math.round(Math.random() * (box.left + box.right + element.w));
			let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
			cursor = { ...cursor, x: cursorX, y: cursorY };
			let { x, y } = randomMove(box, element, cursor);
			if (touchPoint(element, cursor)) {
				expect(x).toSatisfy((x: number) => x >= cursor.x || x <= cursor.x - element.w);
				expect(y).toSatisfy((y: number) => y >= cursor.y || y <= cursor.y - element.h);
			}
			expect(x).toBeGreaterThanOrEqual(0);
			expect(x).toBeLessThanOrEqual(box.left + box.right);
			expect(y).toBeGreaterThanOrEqual(0);
			expect(y).toBeLessThanOrEqual(box.up + box.down);
		}

		box.up = 0;
		box.down = 0;
		for (let i = 0; i < 100; i++) {
			let cursorX = Math.round(Math.random() * (box.left + box.right + element.w));
			let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
			cursor = { ...cursor, x: cursorX, y: cursorY };
			let { x, y } = randomMove(box, element, cursor);
			expect(x).toSatisfy((x: number) => x >= cursor.x || x <= cursor.x - element.w);
			expect(x).toBeGreaterThanOrEqual(0);
			expect(x).toBeLessThanOrEqual(box.left + box.right);
			expect(y).toEqual(y);
		}

		box.up = 0;
		box.down = 0;
		box.left = 10;
		box.right = 10;
		cursor = { ...cursor, x: 0, y: 0 };
		let { x, y } = randomMove(box, element, cursor);
		expect(x).toEqual(x);
		expect(y).toEqual(y);
	});

	test('kite', () => {
		let box: Box = { up: 100, right: 200, left: 300, down: 400 };
		let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100, baseX: 0, baseY: 0 };
		let previousX = 0;
		let previousY = 0;
		let x = 0;
		let y = 0;
		let rate = 10;
		let cursor: Cursor = { x, y };
		for (let i = 0; i < 100; i++) {
			previousX = cursor.x;
			previousY = cursor.y;
			x = Math.round(Math.random() * (box.left + box.right + element.w));
			y = Math.round(Math.random() * (box.left + box.right + element.w));
			cursor = { ...cursor, x, y };
			let { x: newX, y: newY } = kite(box, element, cursor);
			expect(newX).toBeGreaterThanOrEqual(0);
			expect(newX).toBeLessThanOrEqual(box.left + box.right);
			expect(newY).toBeGreaterThanOrEqual(0);
			expect(newY).toBeLessThanOrEqual(box.up + box.down);
		}
	});

	test('kiteFlip', () => {
		let box: Box = { up: 100, right: 200, left: 300, down: 400 };
		let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100, baseX: 0, baseY: 0 };
		let previousX = 0;
		let previousY = 0;
		let x = 0;
		let y = 0;
		let rate = 10;
		let cursor: Cursor = { x, y };
		for (let i = 0; i < 100; i++) {
			previousX = cursor.x;
			previousY = cursor.y;
			x = Math.round(Math.random() * (box.left + box.right + element.w));
			y = Math.round(Math.random() * (box.left + box.right + element.w));
			cursor = { ...cursor, x, y };
			let { x: newX, y: newY } = kiteFlip(box, element, cursor);
			expect(newX).toBeGreaterThanOrEqual(0);
			expect(newX).toBeLessThanOrEqual(box.left + box.right);
			expect(newY).toBeGreaterThanOrEqual(0);
			expect(newY).toBeLessThanOrEqual(box.up + box.down);
		}
	});
});
