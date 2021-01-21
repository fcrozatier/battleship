import React, { useState } from "react";
import Board from "./components/Board";
import useGame from "./modules/useGame";
import ChoosePlayers from "./components/ChoosePlayers";
import Feedback from "./components/Feedback";
import Player from "./modules/Player";
import DashBoard from "./components/DashBoard";
import Fleet from "./components/Fleet";
import "./app.css";

function App() {
  const [
    {
      gameboards,
      message,
      players,
      player1,
      player2,
      player1Turn,
      reset,
      setGameboards,
      setPlayer1,
      setPlayer2,
      switchPlayers,
      winner,
    },
    setGame,
  ] = useGame();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();

  const initializeGame = (num) => {
    reset(num);
  };

  const updatePlayerBoard = (gameboard) => {
    setPlayer1(player1Turn ? Player(player1.name, gameboard) : player1);
    setPlayer2(player1Turn ? player2 : Player(player2.name, gameboard));
  };

  const countingDown = () => {
    const countdown = 3;
    setLoading(true);
    setCount(countdown);

    const counterId = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setLoading(false);
      clearInterval(counterId);
    }, countdown * 1000);
  };

  const saveBoard = (gameboard) => {
    updatePlayerBoard(gameboard);
    setGameboards((prev) => prev + 1);
    if (players === 2) switchPlayers();
    if (gameboards === 1) countingDown();
  };

  const handleClick = (index) => {
    if (!winner()) {
      setGame(index);
      if (players === 2) countingDown();
    }
  };

  return (
    <div className="app">
      <Feedback
        players={players}
        gameboards={gameboards}
        player1Turn={player1Turn}
        info={message}
        winner={winner()}
      />

      {/* If number of players is not set or there is a winner */}
      {!players && (
        <>
          <ChoosePlayers onClick={initializeGame} />
          <Fleet />
        </>
      )}

      {/* If the number of initialized boards does not equal the number of players */}
      {!!players && gameboards !== players && (
        <Board
          dnd
          gameboards={gameboards}
          gameboard={player1Turn ? player1.gameboard : player2.gameboard}
          updateBoard={updatePlayerBoard}
          boardInit={saveBoard}
        />
      )}

      {/* Main game phase */}
      {!!players && gameboards === players && !loading && (
        <DashBoard
          player1={player1}
          player2={player2}
          player1Turn={player1Turn}
          handleClick={handleClick}
        />
      )}

      {/* When loading */}
      {loading && !winner() && <div>{`in ${count}s`}</div>}

      {/* When there is a winner */}
      {winner() && <ChoosePlayers onClick={initializeGame} />}
    </div>
  );
}

export default App;
