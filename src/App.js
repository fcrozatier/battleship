import Board from "./components/Board";
import Game from "./Game";
import "./app.css";
import { useState } from "react";

function App() {
  const [game, setGame] = useState(Game());

  const handleClick = (index) => {
    setGame(game.handleTurn(index));
  };

  return (
    <div className="App">
      <div className="head">Battleship</div>
      <div className="display-boards">
        <div className="my-board">
          <Board
            cells={game.gameboard0.board}
            hits={game.gameboard0.hits}
          />
        </div>
        <div className="enemy-board">
          <Board
            cells={game.gameboard1.board}
            hits={game.gameboard1.hits}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
