import { Gameboard } from "./Gameboard";
import { Player } from "./Player";

const Game = () => {
  const gameboard0 = Gameboard();
  const gameboard1 = Gameboard();
  const player0 = Player(gameboard1, false);
  const player1 = Player(gameboard0, true);
  let playerTurn = player0;
  let winner;

  const nextTurn = () => {
    playerTurn = (playerTurn === player0 ) ? player1 : player0;
  };

  const calculateWinner = () => {
    const player = playerTurn;
    if (player.gameboard.fleetSunk()){
      winner = player;
    }
  }

  const makeTurn = (i) => {
    if(winner) return;
    playerTurn.attack(i);
    calculateWinner();
    nextTurn();
  }

  const handleTurn = (i) => {
    makeTurn(i);
    makeTurn();

    return {
      gameboard0,
      gameboard1,
      player0,
      player1,
      handleTurn,
      winner
    };
  };

  return {
    gameboard0,
    gameboard1,
    player0,
    player1,
    handleTurn,
    winner
  };
};

export default Game;
