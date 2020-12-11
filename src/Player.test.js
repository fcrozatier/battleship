import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("attack position", () => {
  const gameboard = Gameboard(2);
  const bot = Player(gameboard, true);
  bot.attack();
  expect(gameboard.hits.length).toBe(1);
});

test("internal gameboard changes", () => {
  const gameboard = Gameboard(2);
  const player = Player(gameboard, false);
  expect(player.gameboard.hits).toEqual([]);
  player.attack(1);
  expect(player.gameboard.hits).toEqual([1]);
});

test("can't attack same position twice", () => {
  const gameboard = Gameboard(2);
  const player = Player(gameboard, false);
  player.attack(1);
  player.attack(1);
  expect(gameboard.hits.length).toBe(1);
});

test("wins if the fleet is sunk", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1);
  gameboard.position(1, 2, ship);
  const player = Player(gameboard, false);
  expect(player.isWinner()).toBeFalsy();
  player.attack(0);
  expect(player.isWinner()).toBeFalsy();
  player.attack(1);
  expect(player.isWinner()).toBeTruthy();
});
