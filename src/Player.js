export const Player = (enemy_board, ai) => {
  const board = enemy_board;
  const isBot = ai;
  const shoots = [];

  const toIdx = (x, y) => {
    return (x - 1) * board.size - 1 + y;
  };

  const attackPosition = (x, y) => {
    const index = toIdx(x, y);
    if (shoots.includes(index)) {
      return false;
    } else {
      shoots.push(index);
      board.receiveAttack(x, y);
      return true;
    }
  };

  const attack = () => {
    if (isBot) {
      const x = Math.ceil(Math.random() * board.size);
      const y = Math.ceil(Math.random() * board.size);
      return attackPosition(x, y);
    } else {
      return attackPosition;
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
