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

export function randomMove(box: Box, element: Element, cursor: Cursor): Point {
	let x = element.x;
	let y = element.y;
	let tp = touchPoint(element, cursor);
	if (tp) {
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
	}
	return { x, y };
}

function midpoint(element: Element) {
	let x = element.x + element.w / 2;
	let y = element.y + element.h / 2;
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
	} else if (box.left + box.right > 0) {
		if (cursor.x <= m.x) {
			x = mod(cursor.x + element.a, box.left + box.right);
		} else {
			x = mod(cursor.x - element.w - element.a, box.left + box.right);
		}
	} else if (box.up + box.down > 0) {
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

	if (box.left + box.right > 0 && box.up + box.down > 0) {
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
	} else if (box.left + box.right > 0) {
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
	} else if (box.up + box.down > 0) {
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
