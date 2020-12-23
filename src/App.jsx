/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import Info from './components/Info';
import useGame from './modules/useGame';
import './app.css';
import ChoosePlayers from './components/ChoosePlayers';
import Feedback from './components/Feedback';
import BoardInit from './components/BoardInit';
import Gameboard from './modules/Gameboard';

function App() {
  const [players, setPlayers] = useState(0);
  const [gameboards, setGameboards] = useState(0);
  const [gameboard1, setGameboard1] = useState(Gameboard());
  const [gameboard2, setGameboard2] = useState(Gameboard());
  const [{
    bot, player1, player2, calculateWinner,
  }, setGame] = useGame(
    players, gameboard1, gameboard2,
  );
  // const winner = calculateWinner();

  const choosePlayers = (num) => {
    setPlayers(num);
  };

  const handleBoardInit = (gameboard) => {
    setGameboards(gameboards + 1);
    setGameboard1(gameboards === 0 ? gameboard : gameboard1);
    setGameboard2(gameboards === 1 ? gameboard : gameboard2);
  };

  const handleClick = (index) => {
    setGame(index);
  };

  return (
    <div className="app">
      <Feedback players={players} gameboards={gameboards} />
      {/* If number of players is not set, choose */}
      {!players && <ChoosePlayers onClick={choosePlayers} />}

      {/* If the number of initialized boards does not equal the number of players */}
      {!!players && (gameboards !== players) && (
        <BoardInit onBoardInit={handleBoardInit} />
      )}

      {!!players && gameboards === players && (
        <div className="display-boards">
          Game
          {/* <div className="my-board">
            <Board
              cells={player1.gameboard.fleet}
              hits={player1.gameboard.hits}
            />
            <div className="info">
              Ships left:
              {player1.gameboard.shipsLeft()}
            </div>
          </div>
          <div className="enemy-board">
            <Board
              cells={bot.gameboard.fleet}
              hits={bot.gameboard.hits}
              onClick={handleClick}
            />
            <div className="info">
              Ships left:
              {bot.gameboard.shipsLeft()}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
