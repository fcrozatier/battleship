import { Ship } from "./Ship";

test("creates a ship of given length", () => {
  expect(Ship(3)).toHaveProperty("length", 3);
});

test("don't allow negative length", () => {
  expect(() => Ship(-1)).toThrow();
  expect(() => Ship(0)).toThrow();
});

test("a ship is hit at position 0 and 2", () => {
  const ship = Ship(4);
  ship.hit(0);
  ship.hit(2);
  expect(ship).toHaveProperty("hits", [0, 2]);
});

test("cannot hit the same position twice", () => {
  const ship = Ship(3);
  ship.hit(1);
  ship.hit(1);
  expect(ship).not.toHaveProperty("hits", [1, 1]);
});

test("cannot hit outside the ship", () => {
  const ship = Ship(3);
  ship.hit(3);
  ship.hit(-1);
  expect(ship).toHaveProperty("hits", []);
});

test('a ship sunks when it is hit everywhere', ()=> {
  const ship = Ship(4);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
})
