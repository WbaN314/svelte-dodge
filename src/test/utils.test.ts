import { describe, expect, test } from "vitest";
import {
  type Cursor,
  dist,
  inside,
  randomMove,
  type Box,
  type Element,
  kite,
  touchPoint,
  triangleArea,
  inTriangle,
  kiteFlip,
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
      expect(x).toSatisfy(
        (x: number) => x >= 100 || x <= 100 - element.w
      );
      expect(y).toSatisfy(
        (y: number) => y >= 100 || y <= 100 - element.h
      );
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(box.left + box.right);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(box.up + box.down);
    }

    for (let i = 0; i < 100; i++) {
      let cursorX = Math.round(
        Math.random() * (box.left + box.right + element.w)
      );
      let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
      cursor = { ...cursor, x: cursorX, y: cursorY };
      let { x, y } = randomMove(box, element, cursor);
      if (touchPoint(element, cursor)) {
        expect(x).toSatisfy(
          (x: number) =>
            x >= cursor.x || x <= cursor.x - element.w
        );
        expect(y).toSatisfy(
          (y: number) =>
            y >= cursor.y || y <= cursor.y - element.h
        );
      };
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(box.left + box.right);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(box.up + box.down);
    }

    box.up = 0;
    box.down = 0;
    for (let i = 0; i < 100; i++) {
      let cursorX = Math.round(
        Math.random() * (box.left + box.right + element.w)
      );
      let cursorY = Math.round(Math.random() * (box.up + box.down + element.h));
      cursor = { ...cursor, x: cursorX, y: cursorY };
      let { x, y } = randomMove(box, element, cursor);
      expect(x).toSatisfy(
        (x: number) =>
          x >= cursor.x || x <= cursor.x - element.w
      );
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

  test("kite", () => {
    let box: Box = { up: 100, right: 200, left: 300, down: 400 };
    let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100 };
    let previousX = 0;
    let previousY = 0;
    let x = 0;
    let y = 0;
    let rate = 10;
    let cursor: Cursor = { x, y };
    for (let i = 0; i < 100; i++) {
      previousX = cursor.x
      previousY = cursor.y
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

  test("kiteFlip", () => {
    let box: Box = { up: 100, right: 200, left: 300, down: 400 };
    let element: Element = { a: 10, x: 0, y: 0, w: 100, h: 100 };
    let previousX = 0;
    let previousY = 0;
    let x = 0;
    let y = 0;
    let rate = 10;
    let cursor: Cursor = { x, y };
    for (let i = 0; i < 100; i++) {
      previousX = cursor.x
      previousY = cursor.y
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

  test("touchPoint", () => {
    let element: Element = {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      a: 10
    }
    let cursor = { x: -10, y: -10 }
    expect(touchPoint(element, cursor)).toEqual('tl')
    cursor = { ...cursor, x: 110, y: -10 }
    expect(touchPoint(element, cursor)).toEqual('tr')
    cursor = { ...cursor, x: -10, y: 110 }
    expect(touchPoint(element, cursor)).toEqual('bl')
    cursor = { ...cursor, x: 110, y: 110 }
    expect(touchPoint(element, cursor)).toEqual('br')
    cursor = { ...cursor, x: 0, y: -10 }
    expect(touchPoint(element, cursor)).toEqual('t')
    cursor = { ...cursor, x: 100, y: -10 }
    expect(touchPoint(element, cursor)).toEqual('t')
    cursor = { ...cursor, x: 100, y: 110 }
    expect(touchPoint(element, cursor)).toEqual('b')
    cursor = { ...cursor, x: 0, y: 110 }
    expect(touchPoint(element, cursor)).toEqual('b')
    cursor = { ...cursor, x: -10, y: 0 }
    expect(touchPoint(element, cursor)).toEqual('l')
    cursor = { ...cursor, x: -10, y: 100 }
    expect(touchPoint(element, cursor)).toEqual('l')
    cursor = { ...cursor, x: 110, y: 100 }
    expect(touchPoint(element, cursor)).toEqual('r')
    cursor = { ...cursor, x: 110, y: 0 }
    expect(touchPoint(element, cursor)).toEqual('r')
    cursor = { ...cursor, x: 50, y: 0 }
    expect(touchPoint(element, cursor)).toEqual('mt')
    cursor = { ...cursor, x: 100, y: 50 }
    expect(touchPoint(element, cursor)).toEqual('mr')
    cursor = { ...cursor, x: 50, y: 100 }
    expect(touchPoint(element, cursor)).toEqual('mb')
    cursor = { ...cursor, x: 0, y: 50 }
    expect(touchPoint(element, cursor)).toEqual('ml')
    for (let i = 0; i < 1000; i++) {
      cursor = { ...cursor, x: Math.random() * 120 - 10, y: Math.random() * 120 - 10 };
      if (!touchPoint(element, cursor)) {
        console.log(cursor)
      }
      expect(touchPoint(element, cursor)).toBeDefined()
    }
  });

  test('inTriangle', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 0 };
    let c = { x: 0, y: 1 };
    let p = { x: 0.5, y: 0.5 };
    expect(inTriangle(p, a, b, c)).toEqual(true)
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

  test('bugTest', () => {
    let element: Element = {
      "a": 20,
      "baseX": 8,
      "baseY": 29,
      "x": 0,
      "y": 40,
      "w": 647,
      "h": 21
    }
    let box: Box = {
      "up": 0,
      "right": 100,
      "down": 100,
      "left": 0
    }
    let cursor: Cursor = {
      "x": 0,
      "y": 21
  }
    expect(kiteFlip(box, element, cursor)).toEqual({x: 0, y: 41})
  })
});
