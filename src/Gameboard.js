export const Gameboard = (size) => {
  let board = Array(size * size).fill(0);
  let ships = [];

  const position = (x, y, ship, v = false) => {
    return v ? vPositionning(x, y, ship) : hPositionning(x, y, ship);
  };

  const targetHIdx = (x, y, length) => {
    const startIdx = (x - 1) * size - 1 + y;
    const endIdx = startIdx + length - 1;

    return [startIdx, endIdx];
  };

  const hPositionning = (x, y, ship) => {
    const shipSize = ship.length;
    const [startIdx, endIdx] = targetHIdx(x, y, shipSize);

    // Cannot position outside grid nor wrap
    if (endIdx >= x * size) {
      return false;
    }

    // Check positions are free
    if (board.slice(startIdx, endIdx + 1).some((el) => el !== 0)) {
      return false;
    }

    let position = [];
    for (let i = 0; i < shipSize; i++) {
      const index = startIdx + i;
      position.push(index);
      board[index] = ship;
    }

    ships.push({ ship, position });
    return true;
  };

  const targetVIdx = (x, y, length) => {
    const start = (x - 1) * size - 1 + y;
    const end = start + length * (size - 1);

    return [start, end];
  };

  const vPositionning = (x, y, ship) => {
    const shipSize = ship.length;
    const [start, end] = targetVIdx(x, y, shipSize);

    // Cannot position outside grid
    if (end >= size * size) {
      return false;
    }

    // Check positions are free
    if (board.slice(start, end + 1).some((el) => el !== 0)) {
      return false;
    }

    let position = [];
    for (let i = 0; i < shipSize; i++) {
      const index = start + i * size;
      position.push(index);
      board[index] = ship;
    }

    ships.push({ ship, position });
    return true;
  };

  return {
    board,
    position,
  };
};
