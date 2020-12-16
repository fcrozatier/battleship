import React, { useState } from 'react';
import Board from './components/Board';
import './app.css';
import Player from './Player';

function App() {
  let botPass = false;

  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));

  const handleClick = (index) => {
    botPass = !human.validAttack(bot, index);
    setBot({ ...bot, gameboard: human.attack(bot, index) });
    setHuman({ ...human, gameboard: bot.attack(human, botPass) });
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
            {' '}
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
            {' '}
            {bot.gameboard.shipsLeft()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
