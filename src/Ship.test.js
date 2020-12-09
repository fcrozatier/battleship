import { Ship } from "./Ship";

test("creates a ship of given length", () => {
  expect(Ship(3)).toHaveProperty("length", 3);
});

test("don't allow negative length", () => {
  expect(() => Ship(-1)).toThrow();
  expect(() => Ship(0)).toThrow();
});

test('a ship sunks when it is hit too many times', ()=> {
  const ship = Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
})

test('ships are not equal', ()=> {
  const ship1 = Ship(2);
  const ship2 = Ship(2);
  expect(ship1).not.toEqual(ship2);
})
