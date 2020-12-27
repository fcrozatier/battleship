import Player from "../Player";

let bot = Player("AI");
let human = Player("Player");

beforeEach(() => {
  bot = Player("AI");
  human = Player("Player");
});

test("create Player", () => {
  expect(bot.gameboard.fleet).toHaveLength(5);
  expect(human.gameboard.fleet).toHaveLength(5);
  expect(bot.name).toBe("AI");
  expect(human.name).toBe("Player");
  expect(bot.hasLost()).toBeFalsy();
});

test("attack position", () => {
  bot.attack(human);
  expect(human.gameboard.hits).toHaveLength(1);

  human.attack(bot, 10);
  expect(bot.gameboard.hits).toHaveLength(1);
});

test("track hits", () => {
  expect(human.gameboard.hits).toEqual([]);
  human.attack(bot, 11);
  human.attack(bot, 13);
  human.attack(bot, 17);
  expect(bot.gameboard.hits).toEqual([11, 13, 17]);
});

test("can't attack same position twice", () => {
  human.attack(bot, 51);
  human.attack(bot, 51);
  expect(bot.gameboard.hits).toHaveLength(1);
});

test("can pass", () => {
  bot.attack(human);
  bot.attack(human, true);
  bot.attack(human, false);
  expect(human.gameboard.hits).toHaveLength(2);

  human.attack(bot, 10);
  human.attack(bot, 11, true);
  human.attack(bot, 12, false);
  expect(bot.gameboard.hits).toHaveLength(2);
});

test("loses when the fleet is sunk", () => {
  expect(bot.hasLost()).toBeFalsy();
  for (let i = 0; i < 100; i += 1) {
    human.attack(bot, i);
  }
  expect(bot.hasLost()).toBeTruthy();
});

// Private methods related to bot IA
// test('landed indices', () => {
//   const { index } = bot.gameboard.fleet[0];
//   human.attack(bot, index);
//   expect(human.landedIndices()).toEqual([index]);
// });

// test('has adjacent landing', () => {
//   const gameboard = Gameboard(3);
//   const ship = Ship(3, 'kayak');
//   gameboard.position(0, ship);
//   const bot1 = Player('AI', gameboard);

//   human.attack(bot1, 0);
//   expect(human.hasAdjacentLanding()).toBeFalsy();
//   human.attack(bot1, 1);
//   expect(human.hasAdjacentLanding()).toEqual([0, 1]);
// });

// test('is landed cell', () => {
//   const gameboard = Gameboard(3);
//   const ship = Ship(3, 'kayak');
//   gameboard.position(0, ship);
//   const bot1 = Player('AI', gameboard);

//   human.attack(bot1, 0);
//   expect(human.isLandedCell(1)).toBeFalsy();
//   expect(human.isLandedCell(0)).toBeTruthy();
// });

// test('pick adjacent', () => {
//   const gameboard = Gameboard(3);
//   const ship = Ship(3, 'kayak');
//   gameboard.position(0, ship);
//   const bot1 = Player('AI', gameboard);

//   human.attack(bot1, 0);
//   const pickIndex = human.pickAdjacent();
//   const bool = pickIndex === 1 || pickIndex === 10;
//   expect(bool).toBeTruthy();
// });

// test('pick neighbour', () => {
//   const gameboard = Gameboard(5);
//   const ship = Ship(3, 'kayak');
//   gameboard.position(6, ship);
//   const bot1 = Player('AI', gameboard);

//   human.attack(bot1, 6);
//   human.attack(bot1, 7);
//   const choice = human.pickNeighbour(human.hasAdjacentLanding());
//   expect(choice === 5 || choice === 8).toBeTruthy();
// });

// test('landed hits', () => {
//   const gameboard = Gameboard(3);
//   const ship = Ship(3, 'kayak');
//   gameboard.position(0, ship);
//   const bot1 = Player('AI', gameboard);

//   expect(human.landedHits).toEqual({});
//   human.attack(bot1, 0);
//   expect(human.landedHits).toEqual({ kayak: [0] });
//   human.attack(bot1, 1);
//   expect(human.landedHits).toEqual({ kayak: [0, 1] });
//   human.attack(bot1, 2);
//   expect(human.landedHits).toEqual({});
// });
