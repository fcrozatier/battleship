import Board from "./components/Board";
import Game from "./Game";
import "./app.css";

function App() {
  const { gameboard0, gameboard1, handleTurn } = Game();

  return (
    <div className="App">
      <div className="head">Battleship</div>
      <div className="display-boards">
        <div className="my-board">
          <Board cells={gameboard0.board} hits={gameboard0.hits} own />
        </div>
        <div className="enemy-board">
          <Board cells={gameboard1.board} hits={gameboard1.hits} onClick={handleTurn}/>
        </div>
      </div>
    </div>
  );
}

export default App;
