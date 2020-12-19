import Player from '../Player';

test('create Player', () => {
  const bot = Player(true);
  const human = Player(false);
  expect(bot.gameboard.fleet).toHaveLength(5);
  expect(human.gameboard.fleet).toHaveLength(5);
  expect(bot.name).toBe('AI');
  expect(human.name).toBe('Human');
  expect(bot.hasLost()).toBeFalsy();
});

test('attack position', () => {
  const bot = Player(true);
  const human = Player(false);
  bot.attack(human, 0);
  expect(human.gameboard.hits).toHaveLength(1);

  human.attack(bot, 10);
  expect(bot.gameboard.hits).toHaveLength(1);
});

test('track hits', () => {
  const bot = Player(true);
  const human = Player(false);
  expect(human.gameboard.hits).toEqual([]);

  human.attack(bot, 11);
  human.attack(bot, 13);
  human.attack(bot, 17);
  expect(bot.gameboard.hits).toEqual([11, 13, 17]);
});

test("can't attack same position twice", () => {
  const bot = Player(true);
  const human = Player(false);

  human.attack(bot, 51);
  human.attack(bot, 51);
  expect(bot.gameboard.hits).toHaveLength(1);
});

test('can pass', () => {
  const bot = Player(true);
  const human = Player(false);

  bot.attack(human);
  bot.attack(human, true);
  bot.attack(human, false);
  expect(human.gameboard.hits).toHaveLength(2);

  human.attack(bot, 10);
  human.attack(bot, 11, true);
  human.attack(bot, 12, false);
  expect(bot.gameboard.hits).toHaveLength(2);
});

test('loses when the fleet is sunk', () => {
  const bot = Player(true);
  const human = Player(false);

  expect(bot.hasLost()).toBeFalsy();
  for (let i = 0; i < 100; i += 1) {
    human.attack(bot, i);
  }
  expect(bot.hasLost()).toBeTruthy();
});
