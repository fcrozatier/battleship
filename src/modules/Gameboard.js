/* eslint-disable no-param-reassign */
import Ship from './Ship';

export default (size = 10) => {
  const board = Array(size * size).fill(0);
  const hits = [];
  const fleet = [];

  const hPositionning = (index, ship) => {
    const endIdx = index + ship.length - 1;

    // Cannot position outside grid
    if (endIdx >= size ** 2) return false;

    // Cannot wrap
    if (Math.floor(index / size) !== Math.floor(endIdx / size)) return false;

    // Check positions are free
    // TODO: NOT RELY ON .BOARD BUT .FLEET
    if (board.slice(index, endIdx + 1).some((el) => el !== 0)) return false;

    for (let i = index; i <= endIdx; i += 1) {
      board[i] = ship;
    }
    return true;
  };

  const vPositionning = (index, ship) => {
    const shipSize = ship.length;
    const end = index + (shipSize - 1) * size;

    // Cannot position outside grid
    if (end >= size ** 2) {
      return false;
    }

    // Check positions are free
    // TODO: NOT RELY ON .BOARD BUT .FLEET
    for (let i = index; i <= end; i += size) {
      if (board[i] !== 0) {
        return false;
      }
    }

    for (let i = index; i <= end; i += size) {
      board[i] = ship;
    }
    return true;
  };

  const position = (index, ship, v = false) => {
    if (
      (v && vPositionning(index, ship))
      || (!v && hPositionning(index, ship))
    ) {
      fleet.push({ ship, index, v });

      return true;
    }
    return false;
  };

  const reposition = (index, ship, v = false) => {
    fleet.forEach((unit) => {
      if (unit.ship.id === ship.id) {
        unit.index = index;
        unit.v = v;
      }
    });
  };

  const receiveAttack = (index) => {
    // TODO: NOT RELY ON .BOARD BUT .FLEET
    const ship = board[index];
    if (ship !== 0) {
      ship.hit();
    }
    hits.push(index);
    return hits;
  };

  const fleetSunk = () => fleet.every((unit) => unit.ship.isSunk());

  const shipsLeft = () => fleet.reduce(
    (partial, current) => partial - current.ship.isSunk(),
    fleet.length,
  );

  // default config
  if (size >= 7) {
    const carrier = Ship(5, 'carrier');
    const battleship = Ship(4, 'battleship');
    const destroyer = Ship(3, 'destroyer');
    const submarine = Ship(3, 'submarine');
    const patrol = Ship(2, 'patrol boat');

    position(22, carrier, true);
    position(4, battleship);
    position(55, destroyer);
    position(1, submarine, true);
    position(36, patrol, true);
  }

  return {
    board,
    fleet,
    fleetSunk,
    hits,
    position,
    receiveAttack,
    reposition,
    size,
    shipsLeft,
  };
};
