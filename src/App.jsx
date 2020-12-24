/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import Info from './components/Info';
import useGame from './modules/useGame';
import './app.css';
import ChoosePlayers from './components/ChoosePlayers';
import Feedback from './components/Feedback';
import Gameboard from './modules/Gameboard';
import Player from './modules/Player';

function App() {
  const [players, setPlayers] = useState(0);
  const [gameboards, setGameboards] = useState(0);
  const [player1, setPlayer1] = useState(Player('Player1'));
  const [player2, setPlayer2] = useState(
    Player(players === 2 ? 'Player2' : 'AI'),
  );
  // const [gameboard1, setGameboard1] = useState(Gameboard());
  // const [gameboard2, setGameboard2] = useState(Gameboard());
  // const [{ player2, calculateWinner }, setGame] = useGame(
  //   players,
  //   gameboard1,
  //   gameboard2
  // );
  // const winner = calculateWinner();

  const choosePlayers = (num) => {
    setPlayers(num);
  };

  const handleBoardInit = (player, gameboard) => {
    console.log(
      '🚀 ~ file: App.jsx ~ line 29 ~ handleBoardInit ~ player',
      player,
    );
    setGameboards(player);
    setPlayer1(player === 1 ? Player('Player1', gameboard) : player1);
  };

  const handleClick = (index) => {
    // setGame(index);
  };

  return (
    <div className="app">
      <Feedback players={players} gameboards={gameboards} />
      {/* If number of players is not set, choose */}
      {!players && <ChoosePlayers onClick={choosePlayers} />}

      {/* If the number of initialized boards does not equal the number of players */}
      {!!players && gameboards !== players && (
        <Board
          dnd
          boardInit={handleBoardInit}
          gameboards={gameboards}
          gameboardProp={Gameboard()}
        />
      )}

      {players === 1 && gameboards === players && (
        <div className="display-boards">
          <div className="my-board">
            <Board
              gameboardProp={player1.gameboard}
              hits={player1.gameboard.hits}
            />
            <div className="info">
              Ships left:
              {player1.gameboard.shipsLeft()}
            </div>
          </div>
          <div className="enemy-board">
            <Board
              gameboardProp={player2.gameboard}
              hits={player2.gameboard.hits}
              onClick={handleClick}
            />
            <div className="info">
              Ships left:
              {player2.gameboard.shipsLeft()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
