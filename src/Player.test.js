import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("attack position", () => {
  const gameboard = Gameboard(2);
  const bot = Player(gameboard, true);
  expect(bot.attack()).toBeTruthy();
});

test("can't attack same position twice", () => {
  const gameboard = Gameboard(2);
  const player = Player(gameboard, false);
  expect(player.attack(1)).toBeTruthy();
  expect(player.attack(1)).toBeFalsy();
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
