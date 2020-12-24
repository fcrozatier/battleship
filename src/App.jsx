/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import Info from './components/Info';
import useGame from './modules/useGame';
import ChoosePlayers from './components/ChoosePlayers';
import Feedback from './components/Feedback';
import Gameboard from './modules/Gameboard';
import Player from './modules/Player';
import DashBoard from './components/DashBoard';
import './app.css';

function App() {
  const [
    {
      calculateWinner,
      gameboards,
      message,
      players,
      player1,
      player2,
      player1Turn,
      setGameboards,
      setPlayers,
      setPlayer1,
      setPlayer2,
    },
    setGame,
  ] = useGame();
  // const winner = calculateWinner();

  const handleBoardInit = (player, gameboard) => {
    setGameboards(player);
    setPlayer1(player === 1 ? Player('Player1', gameboard) : player1);
  };

  const handleClick = (index) => {
    setGame(index);
  };

  return (
    <div className="app">
      <Feedback
        players={players}
        gameboards={gameboards}
        player1Turn={player1Turn}
        info={message}
      />

      {/* If number of players is not set */}
      {!players && <ChoosePlayers onClick={setPlayers} />}

      {/* If the number of initialized boards does not equal the number of players */}
      {!!players && gameboards !== players && (
        <Board
          dnd
          boardInit={handleBoardInit}
          gameboards={gameboards}
          gameboardProp={Gameboard()}
        />
      )}

      {/* Main game phase (ONE PLAYER ONLY FOR NOW) */}
      {players === 1 && gameboards === players && (
        <DashBoard
          player1={player1}
          player2={player2}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default App;
