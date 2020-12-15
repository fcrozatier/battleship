import { Gameboard } from "./Gameboard";

export const Player = (ai) => {
  const gameboard = Gameboard();
  const isBot = ai;
  const name = ai ? "Computer" : "You";

  const validAttack = (player, index) => {
    return !player.gameboard.hits.includes(index);
  };

  const attackPosition = (player, index) => {
    player.gameboard.receiveAttack(index);
    return player.gameboard;
  };

  const attack = (player, index) => {
    const i = isBot ? Math.floor(Math.random() * 100) : index;
    if (validAttack(player, i)) attackPosition(player, i);
  };

  const hasLost = () => {
    return gameboard.fleetSunk();
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
