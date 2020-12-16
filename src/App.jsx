import React, { useState } from 'react';
import Board from './components/Board';
// import useGame from './useGame';
import './app.css';
// import Info from './components/Info';
import Player from './Player';

function App() {
  const human = Player(false);
  const [bot, setBot] = useState(Player(true));
  const myBoard = human.gameboard;
  const aiBord = bot.gameboard;

  const handleClick = (index) => {
    setBot((prev) => human.attack(prev, index));
  };

  return (
    <div className="App">
      <div className="head">Battleship</div>
      {/* <Info winner={winner} /> */}
      <div className="display-boards">
        <div className="my-board">
          <Board cells={myBoard.board} hits={myBoard.hits} />
          <div className="info">
            Ships left:
            {' '}
            {myBoard.shipsLeft()}
          </div>
        </div>
        <div className="enemy-board">
          <Board
            cells={bot.gameboard.board}
            hits={aiBord.hits}
            onClick={handleClick}
          />
          <div className="info">
            Ships left:
            {' '}
            {aiBord.shipsLeft()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
