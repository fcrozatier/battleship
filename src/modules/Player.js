import Gameboard from './Gameboard';

export default (ai, id = Math.random() * 10) => {
  const gameboard = Gameboard();
  const isBot = ai;
  const name = isBot ? 'AI' : id;

  const validAttack = (player, index) => !player.gameboard.hits.includes(index);

  const attackPosition = (player, index) => player.gameboard.receiveAttack(index);

  const AIAttack = (player, pass) => {
    if (pass) return player.gameboard;

    let i;
    // Bot attack is necessarily valid
    do {
      i = Math.floor(Math.random() * 100);
    } while (!validAttack(player, i));

    return attackPosition(player, i);
  };

  const hasLost = () => gameboard.fleetSunk();

  const attack = (player, ...opts) => {
    if (hasLost()) return player.gameboard;

    if (isBot) {
      AIAttack(player, opts[0]);
    } else {
      const humanPass = opts[1] ? opts[1] : false;
      if (!humanPass && validAttack(player, opts[0])) {
        attackPosition(player, opts[0]);
      }
    }
    return player.gameboard;
  };

  return {
    attack,
    isBot,
    hasLost,
    gameboard,
    name,
    validAttack,
  };
};
