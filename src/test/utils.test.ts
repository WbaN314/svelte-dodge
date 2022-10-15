import { describe, expect, test } from "vitest";
import {
  type Cursor,
  dist,
  inside,
  randomMove,
  randomMoveAway,
  type Box,
  type Element,
  kite,
} from "../lib/utils.js";

describe("Utils", () => {

  test("dist", () => {
    expect(dist({ x: 0, y: 0 }, { x: 2, y: 0 })).toEqual(2);
    expect(dist({ x: 0, y: 0 }, { x: 0, y: 3 })).toEqual(3);
    expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toEqual(5);
    expect(dist({ x: -1, y: -2 }, { x: 2, y: 2 })).toEqual(5);
    expect(dist({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual(0);
  });

  test("inside", () => {
    expect(inside({ x: 0, y: 0 }, { x: 0, y: 0, w: 0, h: 0 })).toEqual(true);
    expect(inside({ x: 0, y: 0 }, { x: 1, y: 0, w: 0, h: 0 })).toEqual(false);
    expect(inside({ x: 0, y: 0 }, { x: 0, y: 1, w: 0, h: 0 })).toEqual(false);
    expect(inside({ x: 0.5, y: 0 }, { x: 0, y: 0, w: 1, h: 0 })).toEqual(true);
    expect(inside({ x: 0, y: 0 }, { x: 0, y: 0, w: 0, h: 1 })).toEqual(true);
    expect(inside({ x: 1, y: -10 }, { x: 1, y: 0, w: 3, h: 1 })).toEqual(false);
    expect(inside({ x: -1, y: 0 }, { x: -3, y: 0, w: 3, h: 2 })).toEqual(true);
  });

  test("randomMove", () => {
    let box: Box = { up: 100, right: 200, left: 300, down: 400 };
    let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100 };
    for (let i = 0; i < 100; i++) {
      let { x, y } = randomMove(box, element);
      expect(x).toBeGreaterThanOrEqual(-element.a);
      expect(x).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(y).toBeGreaterThanOrEqual(-element.a);
      expect(y).toBeLessThanOrEqual(box.up + box.down - element.a);
    }
  });

  test("randomMoveAway", () => {
    let box: Box = { up: 100, right: 200, left: 300, down: 400 };
    let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100 };

    let cursor: Cursor = { x: 0, y: 0, previousX: 0, previousY: 0, rate: 10};
    for (let i = 0; i < 100; i++) {
      let { x, y } = randomMoveAway(box, element, cursor);
      expect(x).toBeGreaterThanOrEqual(element.x - element.a);
      expect(x).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(y).toBeGreaterThanOrEqual(element.y - element.a);
      expect(y).toBeLessThanOrEqual(box.up + box.down - element.a);
    }

    cursor = {...cursor, x: 100, y: 100 };
    for (let i = 0; i < 100; i++) {
      let { x, y } = randomMoveAway(box, element, cursor);
      expect(x).toSatisfy(
        (x: number) => x >= 100 - element.a || x <= 100 - element.w - element.a
      );
      expect(y).toSatisfy(
        (y: number) => y >= 100 - element.a || y <= 100 - element.h - element.a
      );
      expect(x).toBeGreaterThanOrEqual(-element.a);
      expect(x).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(y).toBeGreaterThanOrEqual(-element.a);
      expect(y).toBeLessThanOrEqual(box.up + box.down - element.a);
    }

    for (let i = 0; i < 100; i++) {
      let cursorX = Math.round(
        Math.random() * (box.left + box.right + element.w)
      );
      let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
      cursor = {...cursor, x: cursorX, y: cursorY };
      let { x, y } = randomMoveAway(box, element, cursor);
      expect(x).toSatisfy(
        (x: number) =>
          x >= cursor.x - element.a || x <= cursor.x - element.w - element.a
      );
      expect(y).toSatisfy(
        (y: number) =>
          y >= cursor.y - element.a || y <= cursor.y - element.h - element.a
      );
      expect(x).toBeGreaterThanOrEqual(-element.a);
      expect(x).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(y).toBeGreaterThanOrEqual(-element.a);
      expect(y).toBeLessThanOrEqual(box.up + box.down - element.a);
    }

    box.up = 0;
    box.down = 0;
    for (let i = 0; i < 100; i++) {
      let cursorX = Math.round(
        Math.random() * (box.left + box.right + element.w)
      );
      let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
      cursor = {...cursor, x: cursorX, y: cursorY };
      let { x, y } = randomMoveAway(box, element, cursor);
      expect(x).toSatisfy(
        (x: number) =>
          x >= cursor.x - element.a || x <= cursor.x - element.w - element.a
      );
      expect(x).toBeGreaterThanOrEqual(-element.a);
      expect(x).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(y).toEqual(y);
    }

    box.up = 0;
    box.down = 0;
    box.left = 10;
    box.right = 10;
    cursor = {...cursor, x: 0, y: 0 };
    let { x, y } = randomMoveAway(box, element, cursor);
    expect(x).toEqual(x);
    expect(y).toEqual(y);
  });

  test("kite", () => {
    let box: Box = { up: 100, right: 200, left: 300, down: 400 };
    let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100 };
    let previousX = 0;
    let previousY = 0;
    let x = 0;
    let y = 0;
    let rate = 10;
    let cursor: Cursor = {x, y, previousX, previousY, rate};
    for (let i = 0; i < 100; i++) {
      previousX = cursor.x
      previousY = cursor.y
      x = Math.round(Math.random() * (box.left + box.right + element.w));
      y = Math.round(Math.random() * (box.left + box.right + element.w));
      cursor = {...cursor, x, y, previousX, previousY};
      let { x: newX, y: newY } = kite(box, element, cursor);
      expect(newX).toBeGreaterThanOrEqual(-element.a);
      expect(newX).toBeLessThanOrEqual(box.left + box.right - element.a);
      expect(newY).toBeGreaterThanOrEqual(-element.a);
      expect(newY).toBeLessThanOrEqual(box.up + box.down - element.a);
    }
  });
});
