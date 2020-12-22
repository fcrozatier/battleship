/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import Info from './components/Info';
import useGame from './modules/useGame';
import './app.css';
import ChoosePlayers from './components/ChoosePlayers';
import Feedback from './components/Feedback';

function App() {
  const [players, setPlayers] = useState(0);
  const [
    {
      bot,
      player1,
      player2,
      calculateWinner,
    },
    setGame,
  ] = useGame(players);
  // const winner = calculateWinner();

  const choosePlayers = (num) => {
    setPlayers(num);
  };

  const handleClick = (index) => {
    setGame(index);
  };

  return (
    <>
      <Feedback players={players} />
      {!players && <ChoosePlayers onClick={choosePlayers} />}
      {!!players && (
        <div className="display-boards">
          <div className="my-board">
            <Board cells={player1.gameboard.fleet} hits={player1.gameboard.hits} />
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
          </div>
        </div>
      )}
    </>
  );
}

export default App;
