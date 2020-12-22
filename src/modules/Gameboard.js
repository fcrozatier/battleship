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
    // eslint-disable-next-line no-restricted-syntax
    for (const unit of fleet) {
      // for other horizontal, head or tail of ship should not end in their middle of these
      if (unit.ship.id !== ship.id && !unit.v) {
        if (unit.index <= index && unit.index + unit.ship.length - 1 >= index) {
          return false;
        }
        if (
          unit.index <= endIdx
          && unit.index + unit.ship.length - 1 >= endIdx
        ) {
          return false;
        }
      } else if (unit.ship.id !== ship.id && unit.v) {
        // for other vertical, their head modulo size should not be in the middle of ship
        if (
          unit.index <= index
          && unit.index + (unit.ship.length - 1) * size >= index
        ) {
          if (
            index % size <= unit.index % size
            && endIdx % size >= unit.index % size
          ) {
            return false;
          }
        }
        if (
          unit.index <= endIdx
          && unit.index + (unit.ship.length - 1) * size >= endIdx
        ) {
          if (
            index % size <= unit.index % size
            && endIdx % size >= unit.index % size
          ) {
            return false;
          }
        }
      }
    }
    // if (
    //   board.slice(index, endIdx + 1).some((el) => el.id && el.id !== ship.id)
    // ) {
    //   return false;
    // }

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
    // eslint-disable-next-line no-restricted-syntax
    for (const unit of fleet) {
      // for other vertical, should not be aligned with head of tail of ship in their middle
      if (unit.ship.id !== ship.id && unit.v) {
        if (unit.index % size === index % size) {
          if (
            unit.index <= index
            && unit.index + (unit.ship.length - 1) * size >= index
          ) {
            return false;
          }
          if (
            unit.index <= end
            && unit.index + (unit.ship.length - 1) * size >= end
          ) {
            return false;
          }
        }
      } else if (unit.ship.id !== ship.id && !unit.v) {
        // for other horizontal, their head or tail modulo size should not surround index
        if (index <= unit.index && unit.index <= end) {
          if (
            unit.index % size <= index % size
            && index % size <= (unit.index + unit.ship.length - 1) % size
          ) {
            return false;
          }
        }
        if (
          index <= unit.index + unit.ship.length - 1
          && unit.index + unit.ship.length - 1 <= end
        ) {
          if (
            unit.index % size <= index % size
            && index % size <= (unit.index + unit.ship.length - 1) % size
          ) {
            return false;
          }
        }
      }
    }
    // for (let i = index; i <= end; i += size) {
    //   if (board[i].id && board[i].id !== ship.id) {
    //     return false;
    //   }
    // }

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

  const canReposition = (index, id) => {
    const { ship, v } = fleet.find((unit) => unit.ship.id === id);
    return (
      (v && canVPosition(index, ship)) || (!v && canHPosition(index, ship))
    );
  };

  const reposition = (index, id) => {
    const { ship, v } = fleet.find((unit) => unit.ship.id === id);
    if (canReposition(index, id)) {
      clearBoard(ship);
      if (v) vPosition(index, ship);
      if (!v) hPosition(index, ship);
      fleet.forEach((unit, idx) => {
        if (unit.ship.id === id) {
          fleet[idx].index = index;
        }
      });
    }

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
    canReposition,
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
