import React from 'react';
import Board from './components/Board';
import './app.css';
import useGame from './useGame';

function App() {
  const [{ bot, human }, setGame] = useGame();

  const handleClick = (index) => {
    setGame(index);
  };

  return (
    <div className="App">
      <div className="head">Battleship</div>
      {/* <Info winner={winner} /> */}
      <div className="display-boards">
        <div className="my-board">
          <Board cells={human.gameboard.board} hits={human.gameboard.hits} />
          <div className="info">
            Ships left:
            {human.gameboard.shipsLeft()}
          </div>
        </div>
        <div className="enemy-board">
          <Board
            cells={bot.gameboard.board}
            hits={bot.gameboard.hits}
            onClick={handleClick}
          />
          <div className="info">
            Ships left:
            {bot.gameboard.shipsLeft()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
