import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("create an empty board", () => {
  expect(Gameboard(2).board.length).toBe(4);
  expect(Gameboard(2).board).not.toEqual(["", 0, 0, 0]);
  expect(Gameboard(2).board).toEqual([0, 0, 0, 0]);
});

test("position ships horizontally", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1);
  expect(gameboard.position(1, 2, ship)).toBeTruthy();
  expect(gameboard.board).toEqual([0, ship, 0, 0]);

  const gameboard2 = Gameboard(2);
  const ship2 = Ship(2);
  gameboard2.position(2, 1, ship2);
  expect(gameboard2.board).toEqual([0, 0, ship2, ship2]);
});

test("position ships vertically", () => {
  const gameboard = Gameboard(3);
  const ship = Ship(2);
  expect(gameboard.position(2, 2, ship, true)).toBeTruthy();

  const endBoard = Array(9).fill(0);
  endBoard[4] = ship;
  endBoard[7] = ship;
  expect(gameboard.board).toEqual(endBoard);
});

test("cannot position outside grid", () => {
  const gameboard = Gameboard(1);
  const ship = Ship(1);
  expect(gameboard.position(1, 2, ship)).toBeFalsy();
  expect(gameboard.board).not.toEqual([0, ship]);

  expect(gameboard.position(2, 1, ship, true)).toBeFalsy();
  expect(gameboard.board).not.toEqual([0, ship]);
});

test("cannot wrap position", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2);
  gameboard.position(1, 2, ship);
  expect(gameboard.board).not.toEqual([0, ship, ship, 0]);
  expect(gameboard.board).toEqual([0, 0, 0, 0]);

  const ship2 = Ship(3);
  expect(gameboard.position(1, 1, ship2)).toBeFalsy();
  expect(gameboard.board).toEqual([0, 0, 0, 0]);
});

test("can't overlap ships", () => {
  const gameboard = Gameboard(2);
  const ship1 = Ship(2);
  const ship2 = Ship(2);
  gameboard.position(1, 1, ship1);
  expect(gameboard.position(1, 1, ship2)).toBeFalsy();
  expect(gameboard.position(1, 1, ship2, true)).toBeFalsy();
});

test("can receive attack", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2);
  gameboard.position(2, 1, ship);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.missed).toEqual([0]);

  gameboard.receiveAttack(2, 1);
  expect(gameboard.hits).toEqual([2]);
  expect(ship.isSunk()).toBeFalsy()

  gameboard.receiveAttack(2, 2);
  expect(gameboard.hits).toEqual([2,3]);
  expect(ship.isSunk()).toBeTruthy()
});
