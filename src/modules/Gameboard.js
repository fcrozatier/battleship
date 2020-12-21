import Ship from './Ship';

export default (size = 10) => {
  const board = Array(size * size).fill(0);
  const hits = [];
  const fleet = [];

  const clearBoard = (ship) => {
    board.forEach((cell, index) => {
      if (cell.id && cell.id === ship.id) {
        board[index] = 0;
      }
    });
  };

  const canHPosition = (index, ship) => {
    const endIdx = index + ship.length - 1;

    // Cannot position outside grid
    if (endIdx >= size ** 2) return false;

    // Cannot wrap
    if (Math.floor(index / size) !== Math.floor(endIdx / size)) return false;

    // Check positions are free
    // TODO: NOT RELY ON .BOARD BUT .FLEET
    if (
      board.slice(index, endIdx + 1).some((el) => el.id && el.id !== ship.id)
    ) {
      return false;
    }

    return true;
  };

  const hPosition = (index, ship) => {
    const endIdx = index + ship.length - 1;

    for (let i = index; i <= endIdx; i += 1) {
      board[i] = ship;
    }
  };

  const canVPosition = (index, ship) => {
    const end = index + (ship.length - 1) * size;

    // Cannot position outside grid
    if (end >= size ** 2) {
      return false;
    }

    // Check positions are free
    // TODO: NOT RELY ON .BOARD BUT .FLEET
    for (let i = index; i <= end; i += size) {
      if (board[i].id && board[i].id !== ship.id) {
        return false;
      }
    }

    return true;
  };

  const vPosition = (index, ship) => {
    const end = index + (ship.length - 1) * size;
    for (let i = index; i <= end; i += size) {
      board[i] = ship;
    }
  };

  const position = (index, ship, v = false) => {
    if (v && canVPosition(index, ship)) {
      vPosition(index, ship);
      fleet.push({ ship, index, v });
    } else if (!v && canHPosition(index, ship)) {
      hPosition(index, ship);
      fleet.push({ ship, index, v });
    }
  };

  const reposition = (index, id) => {
    const { ship, v } = fleet.find((unit) => unit.ship.id === id);
    // const vertical = v === undefined ? ship.v : v;
    if ((v && canVPosition(index, ship)) || (!v && canHPosition(index, ship))) {
      clearBoard(ship);
      if (v) vPosition(index, ship);
      if (!v) hPosition(index, ship);
      fleet.forEach((unit, idx) => {
        if (unit.ship.id === id) {
          fleet[idx].index = index;
        }
      });
      return board;
    }
    // if ((v && canVPosition(index, ship)) || (!v && canHPosition(index, ship))) {
    //   fleet.forEach((unit, idx) => {
    //     if (unit.ship.id === id) {
    //       fleet[idx].index = index;
    //     }
    //   });
    //   return board;
    // }
    return board;
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
