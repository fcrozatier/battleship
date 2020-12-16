import Gameboard from './Gameboard';

export default (ai) => {
  const gameboard = Gameboard();
  const isBot = ai;
  const name = ai ? 'Computer' : 'You';

  const validAttack = (player, index) => !player.gameboard.hits.includes(index);

  const attackPosition = (player, index) => {
    player.gameboard.receiveAttack(index);
  };

  const attack = (player, index) => {
    const i = isBot ? Math.floor(Math.random() * 100) : index;
    if (validAttack(player, i)) attackPosition(player, i);
    return player;
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
