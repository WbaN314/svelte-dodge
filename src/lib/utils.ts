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
  x: number | undefined;
  y: number | undefined;
  previousX: number | undefined;
  previousY: number | undefined;
  rate: number;
}

export function rateLimit(f: Function, rate: number) {
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
  let x = Math.round(Math.random() * (box.left + box.right)) - element.a;
  let y = Math.round(Math.random() * (box.down + box.up)) - element.a;
  return { x, y };
}

export function randomMoveAway(
  box: Box,
  element: Element,
  cursor: Cursor
): Point {
  let x = element.x;
  let y = element.y;
  if (box.left + box.right > 0) {
    x =
      Math.round(
        (Math.random() * (box.left + box.right - element.w) + cursor.x) %
          (box.left + box.right)
      ) - element.a;
  }
  if (box.up + box.down > 0) {
    y =
      Math.round(
        (Math.random() * (box.up + box.down - element.h) + cursor.y) %
          (box.up + box.down)
      ) - element.a;
  }
  return { x, y };
}
