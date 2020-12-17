import Gameboard from './Gameboard';

export default (ai) => {
  const gameboard = Gameboard();
  const isBot = ai;
  const name = ai ? 'Computer' : 'You';

  const validAttack = (player, index) => !player.gameboard.hits.includes(index);

  const attackPosition = (player, index) => player.gameboard.receiveAttack(index);

  const AIAttack = (player, pass) => {
    if (pass) return player.gameboard;

    let i;
    // Bot attack is necessarily valid
    do {
      i = Math.floor(Math.random() * 100);
    } while (!validAttack(player, i));

    attackPosition(player, i);
    return player.gameboard;
  };

  const attack = (player, opt = false) => {
    if (isBot) {
      return AIAttack(player, opt);
    }

    if (validAttack(player, opt)) {
      attackPosition(player, opt);
    }
    return player.gameboard;
  };

  const hasLost = () => gameboard.fleetSunk();

  return {
    attack,
    isBot,
    hasLost,
    gameboard,
    name,
    validAttack,
  };
};
