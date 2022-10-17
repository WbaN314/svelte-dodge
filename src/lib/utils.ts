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
}

export interface Cursor {
	x: number;
	y: number;
}

function mod(n, m) {
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

export function randomMove(box: Box, element: Element): Point {
	let x = Math.round(Math.random() * (box.left + box.right));
	let y = Math.round(Math.random() * (box.down + box.up));
	return { x: x - element.a, y: y - element.a };
}

export function randomMoveAway(box: Box, element: Element, cursor: Cursor): Point {
	let x = element.x + element.a;
	let y = element.y + element.a;
	if (box.left + box.right > 0) {
		x = mod(
			Math.round(Math.random() * (box.left + box.right - element.w) + cursor.x),
			box.left + box.right
		);
	}
	if (box.up + box.down > 0) {
		y = mod(
			Math.round(Math.random() * (box.up + box.down - element.h) + cursor.y),
			box.up + box.down
		);
	}
	return { x: x - element.a, y: y - element.a };
}

function midpoint(element: Element) {
	let x = element.x + element.w / 2;
	let y = element.y + element.h / 2;
	return { x, y };
}

export function kite(box: Box, element: Element, cursor: Cursor) {
	let x = element.x + element.a;
	let y = element.y + element.a;
	let m = midpoint(element);
	if (box.left + box.right > 0) {
		if (cursor.y >= element.y + element.a && cursor.y <= element.y + element.h + element.a) {
			if (cursor.x >= m.x) {
				x = mod(cursor.x - element.w - element.a, box.left + box.right);
			} else {
				x = mod(cursor.x + element.a, box.left + box.right);
			}
		}
	}
	if (box.up + box.down > 0) {
		if (cursor.x >= element.x + element.a && cursor.x <= element.x + element.w + element.a) {
			if (cursor.y >= m.y) {
				y = mod(cursor.y - element.h - element.a, box.up + box.down);
			} else {
				y = mod(cursor.y + element.a, box.up + box.down);
			}
		}
	}
	return { x: x - element.a, y: y - element.a };
}

export function kiteWithCorners(box: Box, element: Element, cursor: Cursor) {
	console.log(touchPoint(element, cursor))
	let x = element.x + element.a;
	let y = element.y + element.a;
	let m = midpoint(element);
	if (box.left + box.right > 0) {
		if (cursor.y >= element.y && cursor.y <= element.y + element.h + 2 * element.a) {
			if (cursor.x >= m.x) {
				x = mod(cursor.x - element.w - element.a, box.left + box.right);
			} else {
				x = mod(cursor.x + element.a, box.left + box.right);
			}
		}
	}
	if (box.up + box.down > 0) {
		if (cursor.x >= element.x && cursor.x <= element.x + element.w + 2 * element.a) {
			if (cursor.y >= m.y) {
				y = mod(cursor.y - element.h - element.a, box.up + box.down);
			} else {
				y = mod(cursor.y + element.a, box.up + box.down);
			}
		}
	}
	return { x: x - element.a, y: y - element.a };
}

export function touchPoint(element: Element, cursor: Cursor) {
	let position;
	if (
		cursor.x >= element.x &&
		cursor.x < element.x + element.a &&
		cursor.y >= element.y &&
		cursor.y < element.y + element.a
	) {
		position = 'tl';
	} else if (
		cursor.x > element.x + element.w + element.a &&
		cursor.x <= element.x + element.w + 2 * element.a &&
		cursor.y >= element.y &&
		cursor.y < element.y + element.a
	) {
		position = 'tr';
	} else if (
		cursor.x >= element.x &&
		cursor.x < element.x + element.a &&
		cursor.y > element.y + element.h + element.a &&
		cursor.y <= element.y + element.h + 2 * element.a
	) {
		position = 'bl';
	} else if (
		cursor.x > element.x + element.w + element.a &&
		cursor.x <= element.x + element.w + 2 * element.a &&
		cursor.y > element.y + element.h + element.a &&
		cursor.y <= element.y + element.h + 2 * element.a
	) {
		position = 'br';
	} else if (
		cursor.x >= element.x + element.a &&
		cursor.x <= element.x + element.w + element.a &&
		cursor.y >= element.y &&
		cursor.y < element.y + element.a
	) {
		position = 't';
	} else if (
		cursor.x >= element.x + element.a &&
		cursor.x <= element.x + element.w + element.a &&
		cursor.y > element.y + element.h + element.a &&
		cursor.y <= element.y + element.h + 2 * element.a
	) {
		position = 'b';
	} else if (
		cursor.x >= element.x &&
		cursor.x < element.x + element.a &&
		cursor.y >= element.y + element.a &&
		cursor.y <= element.y + element.h + 2 * element.a
	) {
		position = 'l';
	} else if (
		cursor.x > element.x + element.w + element.a &&
		cursor.x <= element.x + element.w + 2 * element.a &&
		cursor.y >= element.y + element.a &&
		cursor.y <= element.y + element.h + 2 * element.a
	) {
		position = 'r';
	} else if (
		inTriangle(
			cursor,
			{x: element.x + element.a ,y: element.y + element.a},
			{x: element.x + element.a + element.w ,y: element.y + element.a},
			{x: element.x + element.a + element.w / 2 ,y: element.y + element.a + element.h / 2}
		)
	) {
		position = 'mt';
	} else if (
		inTriangle(
			cursor,
			{x: element.x + element.a + element.w , y: element.y + element.a},
			{x: element.x + element.a + element.w , y: element.y + element.h + element.a},
			{x: element.x + element.a + element.w / 2 , y: element.y + element.a + element.h / 2}
		)
	) {
		position = 'mr';
	} else if (
		inTriangle(
			cursor,
			{x: element.x + element.a, y: element.y + element.a + element.h},
			{x: element.x + element.a + element.w , y: element.y + element.h + element.a},
			{x: element.x + element.a + element.w / 2 , y: element.y + element.a + element.h / 2}
		)
	) {
		position = 'mb';
	} else if (
		inTriangle(
			cursor,
			{x: element.x + element.a, y: element.y + element.a},
			{x: element.x + element.a , y: element.y + element.h + element.a},
			{x: element.x + element.a + element.w / 2 , y: element.y + element.a + element.h / 2}
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
	return A == A1 + A2 + A3;
}
