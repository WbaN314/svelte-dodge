import { describe, expect, test } from 'vitest';
import type { Element } from '../lib/movement.js';
import { touchPoint, triangleArea, inTriangle, dist, inside } from '../lib/helpers.js';

describe('Utils', () => {
	test('dist', () => {
		expect(dist({ x: 0, y: 0 }, { x: 2, y: 0 })).toEqual(2);
		expect(dist({ x: 0, y: 0 }, { x: 0, y: 3 })).toEqual(3);
		expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toEqual(5);
		expect(dist({ x: -1, y: -2 }, { x: 2, y: 2 })).toEqual(5);
		expect(dist({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual(0);
	});

	test('inside', () => {
		expect(inside({ x: 0, y: 0 }, { x: 0, y: 0, w: 0, h: 0 })).toEqual(true);
		expect(inside({ x: 0, y: 0 }, { x: 1, y: 0, w: 0, h: 0 })).toEqual(false);
		expect(inside({ x: 0, y: 0 }, { x: 0, y: 1, w: 0, h: 0 })).toEqual(false);
		expect(inside({ x: 0.5, y: 0 }, { x: 0, y: 0, w: 1, h: 0 })).toEqual(true);
		expect(inside({ x: 0, y: 0 }, { x: 0, y: 0, w: 0, h: 1 })).toEqual(true);
		expect(inside({ x: 1, y: -10 }, { x: 1, y: 0, w: 3, h: 1 })).toEqual(false);
		expect(inside({ x: -1, y: 0 }, { x: -3, y: 0, w: 3, h: 2 })).toEqual(true);
	});

	test('touchPoint', () => {
		let element: Element = {
			x: 0,
			y: 0,
			w: 100,
			h: 100,
			a: 10,
			baseX: 0,
			baseY: 0
		};
		let cursor = { x: -10, y: -10 };
		expect(touchPoint(element, cursor)).toEqual('tl');
		cursor = { ...cursor, x: 110, y: -10 };
		expect(touchPoint(element, cursor)).toEqual('tr');
		cursor = { ...cursor, x: -10, y: 110 };
		expect(touchPoint(element, cursor)).toEqual('bl');
		cursor = { ...cursor, x: 110, y: 110 };
		expect(touchPoint(element, cursor)).toEqual('br');
		cursor = { ...cursor, x: 0, y: -10 };
		expect(touchPoint(element, cursor)).toEqual('t');
		cursor = { ...cursor, x: 100, y: -10 };
		expect(touchPoint(element, cursor)).toEqual('t');
		cursor = { ...cursor, x: 100, y: 110 };
		expect(touchPoint(element, cursor)).toEqual('b');
		cursor = { ...cursor, x: 0, y: 110 };
		expect(touchPoint(element, cursor)).toEqual('b');
		cursor = { ...cursor, x: -10, y: 0 };
		expect(touchPoint(element, cursor)).toEqual('l');
		cursor = { ...cursor, x: -10, y: 100 };
		expect(touchPoint(element, cursor)).toEqual('l');
		cursor = { ...cursor, x: 110, y: 100 };
		expect(touchPoint(element, cursor)).toEqual('r');
		cursor = { ...cursor, x: 110, y: 0 };
		expect(touchPoint(element, cursor)).toEqual('r');
		cursor = { ...cursor, x: 50, y: 0 };
		expect(touchPoint(element, cursor)).toEqual('mt');
		cursor = { ...cursor, x: 100, y: 50 };
		expect(touchPoint(element, cursor)).toEqual('mr');
		cursor = { ...cursor, x: 50, y: 100 };
		expect(touchPoint(element, cursor)).toEqual('mb');
		cursor = { ...cursor, x: 0, y: 50 };
		expect(touchPoint(element, cursor)).toEqual('ml');
		for (let i = 0; i < 1000; i++) {
			cursor = { ...cursor, x: Math.random() * 120 - 10, y: Math.random() * 120 - 10 };
			if (!touchPoint(element, cursor)) {
				console.log(cursor);
			}
			expect(touchPoint(element, cursor)).toBeDefined();
		}
	});

	test('inTriangle', () => {
		let a = { x: 0, y: 0 };
		let b = { x: 1, y: 0 };
		let c = { x: 0, y: 1 };
		let p = { x: 0.5, y: 0.5 };
		expect(inTriangle(p, a, b, c)).toEqual(true);
	});

	test('triangleArea', () => {
		let a = { x: 0, y: 0 };
		let b = { x: 1, y: 0 };
		let c = { x: 0, y: 1 };
		expect(triangleArea(a, b, c)).toEqual(0.5);
		a = { x: 0, y: 0 };
		b = { x: 2, y: 0 };
		c = { x: 0, y: 2 };
		expect(triangleArea(a, b, c)).toEqual(2);
	});
});
