export const Player = (enemy_board, ai) => {
  const board = enemy_board;
  const isBot = ai;
  const shoots = [];

  const attackPosition = (index) => {
    if (shoots.includes(index)) {
      return false;
    } else {
      shoots.push(index);
      board.receiveAttack(index);
      return true;
    }
  };

  const attack = (index) => {
    if (isBot) {
      const index = Math.floor(Math.random() * board.size ** 2);
      return attackPosition(index);
    } else {
      return attackPosition(index);
    }
  };

  const isWinner = () => {
    return board.fleetSunk();
  };

  return {
    attack,
    isWinner,
  };
};
