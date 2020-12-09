export const Gameboard = (size) => {
  let board = Array(size * size).fill(0);
  let missed = [];
  let hits = [];

  const position = (x, y, ship, v = false) => {
    return v ? vPositionning(x, y, ship) : hPositionning(x, y, ship);
  };

  const toIdx = (x, y) => {
    return (x - 1) * size - 1 + y;
  };

  const targetHIdx = (x, y, length) => {
    const startIdx = toIdx(x, y);
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

    for (let i = 0; i < shipSize; i++) {
      const index = startIdx + i;
      board[index] = ship;
    }

    return true;
  };

  const targetVIdx = (x, y, length) => {
    const start = toIdx(x, y);
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

    for (let i = 0; i < shipSize; i++) {
      const index = start + i * size;
      board[index] = ship;
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    const index = toIdx(x, y);
    if (board[index] === 0) {
      missed.push(index);
    } else {
      const ship = board[index];
      hits.push(index);
      ship.hit(index);
    }
  };

  return {
    board,
    hits,
    missed,
    position,
    receiveAttack,
  };
};
