/* eslint-disable no-restricted-syntax */
import Ship from './Ship';

export default (size = 10) => {
  const hits = [];
  const fleet = [];

  const createBoard = () => {
    const board = Array(size * size).fill(null);
    fleet.forEach((unit) => {
      board[unit.index] = unit;
    });
    return board;
  };

  const canHPosition = (index, ship) => {
    const endIdx = index + ship.length - 1;

    // Cannot position outside grid
    if (endIdx >= size ** 2) return false;

    // Cannot wrap
    if (Math.floor(index / size) !== Math.floor(endIdx / size)) return false;

    // Check positions are free
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

    return true;
  };

  const canVPosition = (index, ship) => {
    const end = index + (ship.length - 1) * size;

    // Cannot position outside grid
    if (end >= size ** 2) {
      return false;
    }

    // Check positions are free
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

    return true;
  };

  const position = (index, ship, v = false) => {
    if ((v && canVPosition(index, ship)) || (!v && canHPosition(index, ship))) {
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
    if (canReposition(index, id)) {
      fleet.forEach((unit, idx) => {
        if (unit.ship.id === id) {
          fleet[idx].index = index;
        }
      });
    }
    return fleet;
  };

  const canRotate = (id) => {
    const { index, ship, v } = fleet.find((unit) => unit.ship.id === id);
    return (
      (v && canHPosition(index, ship)) || (!v && canVPosition(index, ship))
    );
  };

  const rotate = (id) => {
    if (canRotate(id)) {
      fleet.forEach((unit, idx) => {
        if (unit.ship.id === id) {
          fleet[idx].v = !fleet[idx].v;
        }
      });
    }
    return fleet;
  };

  const positionAtRandom = () => {
    fleet.forEach((unit, idx) => {
      const v = !!Math.floor(Math.random() * 2);
      const map = v ? canVPosition : canHPosition;
      let index;
      let tried = 0;
      do {
        tried += 1;
        index = Math.floor(Math.random() * size ** 2);
      } while (!map(index, unit.ship) || tried <= 100);
      if (map(index, unit.ship)) {
        fleet[idx].v = v;
        fleet[idx].index = index;
      }
    });
    return fleet;
  };

  const receiveAttack = (index) => {
    for (const unit of fleet) {
      if (
        !unit.v
        && unit.index <= index
        && index <= unit.index + unit.ship.length - 1
      ) {
        unit.ship.hit();
      }
      if (
        unit.v
        && index % size === unit.index % size
        && unit.index <= index
        && index <= unit.index + (unit.ship.length - 1) * size
      ) {
        unit.ship.hit();
      }
    }
    hits.push(index);
    return hits;
  };

  const fleetSunk = () => fleet.every((unit) => unit.ship.isSunk());

  const shipsLeft = () => fleet.reduce(
    (partial, current) => partial - current.ship.isSunk(),
    fleet.length,
  );

  const unitIndices = () => {
    const positions = [];
    fleet.forEach((unit) => {
      for (let i = 0; i < unit.ship.length; i += 1) {
        const index = unit.v ? unit.index + i * size : unit.index + i;
        positions.push(index);
      }
    });
    return positions;
  };

  // default config
  if (size >= 7) {
    const carrier = Ship(5, 'carrier');
    const battleship = Ship(4, 'battleship');
    const destroyer = Ship(3, 'destroyer');
    const submarine = Ship(3, 'submarine');
    const patrol = Ship(2, 'patrol');

    position(22, carrier, true);
    position(4, battleship);
    position(55, destroyer);
    position(1, submarine, true);
    position(36, patrol, true);
    positionAtRandom();
  }

  return {
    canReposition,
    canRotate,
    createBoard,
    fleet,
    fleetSunk,
    hits,
    position,
    positionAtRandom,
    receiveAttack,
    reposition,
    rotate,
    shipsLeft,
    unitIndices,
  };
};
