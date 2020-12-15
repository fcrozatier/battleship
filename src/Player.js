export const Player = (enemy_board, ai) => {
  const gameboard = enemy_board;
  const isBot = ai;
  const name = ai ? "Computer" : "You";

  const validAttack = (index) => {
    return !gameboard.hits.includes(index);
  };

  const attackPosition = (index) => {
    gameboard.receiveAttack(index);
    return gameboard;
  };

  const attack = (index) => {
    const i = isBot ? Math.floor(Math.random() * gameboard.size ** 2) : index;
    if(validAttack(i)) attackPosition(i);
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
    validAttack,
  };
};
