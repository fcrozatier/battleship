import Gameboard from "../Gameboard";
import Ship from "../Ship";

test("position ships horizontally", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1);
  gameboard.position(1, ship);
  expect(gameboard.fleet[0].index).toEqual(1);

  const gameboard2 = Gameboard(2);
  const ship2 = Ship(2);
  gameboard2.position(2, ship2);
  expect(gameboard2.fleet[0].index).toEqual(2);
});

test("position ships vertically", () => {
  const gameboard = Gameboard(3);
  const ship = Ship(2);
  gameboard.position(4, ship, true);

  const endBoard = Array(9).fill(0);
  endBoard[4] = ship;
  endBoard[7] = ship;
  expect(gameboard.fleet[0].index).toEqual(4);
  expect(gameboard.fleet[0].v).toBeTruthy();
});

test("cannot position outside grid", () => {
  const gameboard = Gameboard(1);
  const ship = Ship(1);
  expect(gameboard.position(1, ship)).toBeFalsy();
  expect(gameboard.fleet).toHaveLength(0);

  expect(gameboard.position(1, ship, true)).toBeFalsy();
  expect(gameboard.fleet).toHaveLength(0);
});

test("cannot wrap position", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2);
  gameboard.position(1, ship);
  expect(gameboard.fleet).toHaveLength(0);

  expect(gameboard.position(2, ship, true)).toBeFalsy();
  expect(gameboard.fleet).toHaveLength(0);
});

test("can't overlap ships", () => {
  const gameboard = Gameboard(2);
  const ship1 = Ship(2);
  const ship2 = Ship(2);
  gameboard.position(0, ship1);
  gameboard.position(0, ship2);
  gameboard.position(0, ship2, true);
  expect(gameboard.fleet).toHaveLength(1);
});

test("can reposition ships", () => {
  const gameboard = Gameboard(4);
  const ship = Ship(1, "kanoe");
  gameboard.position(0, ship);
  expect(gameboard.fleet[0].index).toBe(0);

  gameboard.reposition(1, "kanoe");
  expect(gameboard.fleet).toHaveLength(1);
  expect(gameboard.fleet[0].index).toBe(1);
});

test("cannot reposition over ships", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1, "kanoe");
  const ship2 = Ship(2, "patrol");
  gameboard.position(0, ship2);
  gameboard.position(2, ship);

  gameboard.reposition(0, "kanoe");
  expect(gameboard.fleet.find((u) => u.ship.id === "kanoe").index).toBe(2);
});

test("can reposition over itself", () => {
  const gameboard = Gameboard(4);
  const ship = Ship(2, "kanoe");
  gameboard.position(0, ship);
  gameboard.reposition(1, "kanoe");
  const unit = gameboard.fleet.find((u) => u.ship.id === "kanoe");

  expect(unit.index).toBe(1);
});

test("reposition keeps verticality", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2, "kanoe");
  gameboard.position(0, ship, true);

  gameboard.reposition(1, "kanoe");
  expect(gameboard.fleet[0].index).toBe(1);
  expect(gameboard.fleet[0].v).toBeTruthy();
});

test("can rotate", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2, "kanoe");
  const ship2 = Ship(2, "kayak");
  gameboard.position(0, ship, true);

  expect(gameboard.canRotate("kanoe")).toBeTruthy();
  gameboard.position(1, ship2, true);
  expect(gameboard.canRotate("kanoe")).toBeFalsy();
});

test("cannot rotate over another ship", () => {
  const gameboard = Gameboard(5);
  const ship = Ship(4, "kanoe");
  const ship2 = Ship(2, "kayak");
  gameboard.position(6, ship, true);

  expect(gameboard.canRotate("kanoe")).toBeTruthy();
  gameboard.position(7, ship2);
  expect(gameboard.canRotate("kanoe")).toBeFalsy();
});

test("rotate", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2, "kanoe");
  gameboard.position(0, ship, true);
  gameboard.rotate("kanoe");
  expect(gameboard.fleet[0].v).toBeFalsy();

  const ship2 = Ship(2, "kayak");
  gameboard.position(2, ship2);
  gameboard.rotate("kayak");
  expect(gameboard.fleet.filter((x) => x.id === "kayak").v).toBeFalsy();
});

test("receive attack", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2);
  gameboard.position(2, ship);
  gameboard.receiveAttack(0);
  expect(gameboard.hits).toEqual([0]);

  gameboard.receiveAttack(2);
  expect(gameboard.hits).toEqual([0, 2]);
  expect(ship.isSunk()).toBeFalsy();

  gameboard.receiveAttack(3);
  expect(gameboard.hits).toEqual([0, 2, 3]);
  expect(ship.isSunk()).toBeTruthy();
});

test("fleet sunk", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2);
  gameboard.position(2, ship);

  expect(gameboard.fleetSunk()).toBeFalsy();
  gameboard.receiveAttack(2);
  expect(gameboard.fleetSunk()).toBeFalsy();
  gameboard.receiveAttack(3);
  expect(gameboard.fleetSunk()).toBeTruthy();

  const gameboard2 = Gameboard();
  expect(gameboard2.fleetSunk()).toBeFalsy();
});

test("ships left", () => {
  const gameboard = Gameboard(2);
  const ship1 = Ship(1);
  const ship2 = Ship(1);
  gameboard.position(0, ship1);
  gameboard.position(1, ship2);

  expect(gameboard.shipsLeft()).toBe(2);
  gameboard.receiveAttack(0);
  expect(gameboard.shipsLeft()).toBe(1);
  gameboard.receiveAttack(1);
  expect(gameboard.shipsLeft()).toBe(0);
});

test("unit indices", () => {
  const gameboard = Gameboard(2);
  const ship1 = Ship(2);
  const ship2 = Ship(1);
  gameboard.position(0, ship1);
  gameboard.position(2, ship2);

  expect(gameboard.unitIndices()).toEqual([0, 1, 2]);
});
