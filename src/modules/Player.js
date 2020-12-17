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

  const attack = (player, ...opts) => {
    if (isBot) {
      return AIAttack(player, opts[0]);
    }

    const humanPass = opts.length === 2 ? opts[1] : false;
    if (!humanPass && validAttack(player, opts[0])) {
      attackPosition(player, opts[0]);
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
