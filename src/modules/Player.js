import Gameboard from './Gameboard';

export default (id = Math.random() * 10, gameboard = Gameboard()) => {
  const isBot = id === 'AI';
  const name = id;
  const remainingSlots = Array.from(new Array(100).keys());
  const landedHits = {};

  const validAttack = (player, index) => !player.gameboard.hits.includes(index);

  function attackPosition(player, index) {
    const hitUnit = player.gameboard.receiveAttack(index);
    if (hitUnit) {
      landedHits[hitUnit] = landedHits[hitUnit]
        ? [...landedHits[hitUnit], index]
        : [index];
      if (player.gameboard.isSunk(hitUnit)) {
        delete landedHits[hitUnit];
      }
    }
    remainingSlots.splice(remainingSlots.indexOf(index), 1);
  }

  const landedIndices = () => {
    const landed = [];
    Object.values(landedHits).forEach((arr) => arr.forEach((val) => landed.push(val)));
    return landed;
  };

  const hasAdjacentLanding = () => {
    const landed = landedIndices();
    for (let i = 0; i < landed.length; i += 1) {
      const first = landed[i];
      for (let j = i + 1; j < landed.length; j += 1) {
        const other = landed[j];
        if (Math.abs(other - first) === 1 || Math.abs(other - first) === 10) {
          return [first, other];
        }
      }
    }
    return false;
  };

  const pickRandom = () => remainingSlots[Math.floor(Math.random() * remainingSlots.length)];

  const pickAdjacent = () => {
    let directions = [-1, 1, -10, 10];
    const landed = landedIndices();
    let i;
    do {
      const randomLanded = landed[Math.floor(Math.random() * landed.length)];

      // if random choice is in top row
      if (Math.floor(randomLanded / 10) === 0) {
        directions = directions.filter((el) => el !== -10);
      }
      // if random choice is in bottom row
      if (Math.floor(randomLanded / 10) === 9) {
        directions = directions.filter((el) => el !== 10);
      }
      // if random choice is in left  column
      if (randomLanded % 10 === 0) {
        directions = directions.filter((el) => el !== -1);
      }
      // if random choice is in left  column
      if (randomLanded % 10 === 9) {
        directions = directions.filter((el) => el !== 1);
      }
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      i = randomLanded + randomDirection;
    } while (!remainingSlots.includes(i));
    return i;
  };

  const isLandedCell = (index) => landedIndices().includes(index);

  const pickNeighbour = ([a, b]) => {
    const direction = Math.abs(b - a);
    let inf = a;
    let sup = b;
    while (isLandedCell(sup)) {
      sup += direction;
    }
    while (isLandedCell(inf)) {
      inf -= direction;
    }
    if (remainingSlots.includes(inf)) return inf;
    if (remainingSlots.includes(sup)) return sup;
    return pickAdjacent(inf + direction);
  };

  function AIAttack(player, pass) {
    if (pass) return player.gameboard;

    let index;
    const adj = hasAdjacentLanding();

    if (Object.keys(landedHits).length === 0) {
      index = pickRandom();
    } else if (adj) {
      index = pickNeighbour(adj);
    } else {
      index = pickAdjacent();
    }
    attackPosition(player, index);
  }

  const hasLost = () => gameboard.fleetSunk();

  const attack = (player, ...opts) => {
    if (hasLost()) return player.gameboard;

    if (isBot) {
      AIAttack(player, opts[0]);
    } else {
      const humanPass = opts[1] ? opts[1] : false;
      if (!humanPass && validAttack(player, opts[0])) {
        attackPosition(player, opts[0]);
      }
    }
    return player.gameboard;
  };

  return {
    attack,
    isBot,
    hasLost,
    gameboard,
    name,
    validAttack,
  };
};
