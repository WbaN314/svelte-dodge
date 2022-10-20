import type { Element, Cursor, Point, Square } from "./movement.js";

export function touchPoint(element: Element, cursor: Cursor) {
	let position;
	if (
		cursor.x >= element.x - element.a &&
		cursor.x < element.x &&
		cursor.y >= element.y - element.a &&
		cursor.y < element.y
	) {
		position = 'tl'
	} else if (
		cursor.x > element.x + element.w &&
		cursor.x <= element.x + element.w + element.a &&
		cursor.y >= element.y -element.a &&
		cursor.y < element.y
	) {
		position = 'tr';
	} else if (
		cursor.x >= element.x - element.a &&
		cursor.x < element.x &&
		cursor.y > element.y + element.h &&
		cursor.y <= element.y + element.h + element.a
	) {
		position = 'bl';
	} else if (
		cursor.x > element.x + element.w &&
		cursor.x <= element.x + element.w + element.a &&
		cursor.y > element.y + element.h &&
		cursor.y <= element.y + element.h + element.a
	) {
		position = 'br';
	} else if (
		cursor.x >= element.x &&
		cursor.x <= element.x + element.w &&
		cursor.y >= element.y - element.a &&
		cursor.y < element.y
	) {
		position = 't';
	} else if (
		cursor.x >= element.x &&
		cursor.x <= element.x + element.w &&
		cursor.y > element.y + element.h &&
		cursor.y <= element.y + element.h + element.a
	) {
		position = 'b';
	} else if (
		cursor.x >= element.x - element.a &&
		cursor.x < element.x &&
		cursor.y >= element.y &&
		cursor.y <= element.y + element.h + element.a
	) {
		position = 'l';
	} else if (
		cursor.x > element.x + element.w &&
		cursor.x <= element.x + element.w + element.a &&
		cursor.y >= element.y &&
		cursor.y <= element.y + element.h + element.a
	) {
		position = 'r';
	} else if (
		inTriangle(
			cursor,
			{ x: element.x, y: element.y },
			{ x: element.x + element.w, y: element.y },
			{ x: element.x + element.w / 2, y: element.y+ element.h / 2 }
		)
	) {
		position = 'mt';
	} else if (
		inTriangle(
			cursor,
			{ x: element.x + element.w, y: element.y },
			{ x: element.x + element.w, y: element.y + element.h },
			{ x: element.x + element.w / 2, y: element.y + element.h / 2 }
		)
	) {
		position = 'mr';
	} else if (
		inTriangle(
			cursor,
			{ x: element.x, y: element.y + element.h },
			{ x: element.x + element.w, y: element.y + element.h },
			{ x: element.x + element.w / 2, y: element.y + element.h / 2 }
		)
	) {
		position = 'mb';
	} else if (
		inTriangle(
			cursor,
			{ x: element.x, y: element.y },
			{ x: element.x, y: element.y + element.h },
			{ x: element.x + element.w / 2, y: element.y + element.h / 2 }
		)
	) {
		position = 'ml';
	}
	return position;
}

export function triangleArea(a: Point, b: Point, c: Point) {
	return Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2.0);
}

export function inTriangle(point: Point, a: Point, b: Point, c: Point) {
	let A = triangleArea(a, b, c);
	let A1 = triangleArea(point, b, c);
	let A2 = triangleArea(a, point, c);
	let A3 = triangleArea(a, b, point);
	return Math.abs(A - (A1 + A2 + A3)) < 0.01;
}

export function midpoint(element: Element) {
	let x = element.x + element.w / 2;
	let y = element.y + element.h / 2;
	return { x, y };
}

export function dist(a: Point, b: Point) {
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function inside(a: Point, b: Square) {
	let xIn = a.x >= b.x && a.x <= b.x + b.w;
	let yIn = a.y >= b.y && a.y <= b.y + b.h;
	if (xIn && yIn) {
		return true;
	}
	return false;
}

export function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}

export function rateLimit(f: Function, rate: number) {
	if (rate === 0) {
		return f;
	}
	let limited = false;
	function limitedFunction(...args: any[]) {
		if (!limited) {
			limited = true;
			setTimeout(() => (limited = false), rate);
			return f(...args);
		}
	}
	return limitedFunction;
}
