import { Gameboard } from "./Gameboard";
import { Player } from "./Player";

const Game = () => {
  const gameboard0 = Gameboard();
  const gameboard1 = Gameboard();
  const player0 = Player(gameboard1, false);
  const player1 = Player(gameboard0, true);
  let playerTurn = 0;

  const nextTurn = () => {
    playerTurn = (playerTurn + 1) % 2;
    return playerTurn;
  };

  const handleTurn = (i) => {
    player0.attack(i);
    nextTurn();
    player1.attack();
    nextTurn();

    return {
      gameboard0,
      gameboard1,
      player0,
      player1,
      handleTurn,
    };
  };

  return {
    gameboard0,
    gameboard1,
    player0,
    player1,
    handleTurn,
  };
};

export default Game;
