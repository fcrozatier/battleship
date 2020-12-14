export const Player = (enemy_board, ai) => {
  const gameboard = enemy_board;
  const isBot = ai;
  const name = ai ? 'Computer' : 'You';

  const attackPosition = (index) => {
    if (!gameboard.hits.includes(index)) {
      gameboard.receiveAttack(index);
    }
    return gameboard;
  };

  const attack = (index) => {
    let i = index;
    if (isBot) {
      i = Math.floor(Math.random() * gameboard.size ** 2);
    }
    return attackPosition(i);
  };

  const isWinner = () => {
    return gameboard.fleetSunk();
  };

  return {
    attack,
    isBot,
    isWinner,
    gameboard,
    name,
  };
};
