import { Ship } from "./Ship";

export const Gameboard = (size = 10) => {
  const board = Array(size * size).fill(0);
  const fleet = [];
  const missed = [];
  const hits = [];

  const position = (x, y, ship, v = false) => {
    fleet.push(ship);
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

    for (let i = startIdx; i < startIdx + shipSize; i++) {
      board[i] = ship;
    }

    return true;
  };

  const targetVIdx = (x, y, length) => {
    const start = toIdx(x, y);
    const end = start + (length - 1) * size;

    return [start, end];
  };

  const vPositionning = (x, y, ship) => {
    const shipSize = ship.length;
    const [start, end] = targetVIdx(x, y, shipSize);

    // Cannot position outside grid
    if (end >= size * size - 1) {
      return false;
    }

    // Check positions are free
    for (let i = start; i <= end; i += size) {
      if(board[i] !== 0){
        return false
      }
    }

    for (let i = start; i < start + shipSize * size; i += size) {
      board[i] = ship;
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    const index = toIdx(x, y);
    const ship = board[index];
    if (ship === 0) {
      missed.push(index);
    } else {
      ship.hit();
    }
    hits.push(index);
  };

  const fleetSunk = () => {
    return fleet.every((ship) => ship.isSunk());
  };

  // default config
  if (size === 10) {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const destroyer = Ship(3);
    const submarine = Ship(3);
    const patrol = Ship(2);

    position(3, 3, carrier, true);
    position(1, 5, battleship);
    position(6, 6, destroyer);
    position(1, 2, submarine, true);
    position(4, 7, patrol, true);
  }

  return {
    board,
    fleetSunk,
    hits,
    missed,
    position,
    receiveAttack,
    size,
  };
};
