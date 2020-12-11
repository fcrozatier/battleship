import Board  from "./components/Board";
// import { Player } from "./Player";
import "./app.css";
import { Gameboard } from "./Gameboard";

function App() {
  // let playing = 0;
  // const player = Player();
  const gameboard0 = Gameboard();
  const gameboard1 = Gameboard();

  // const nextPlayer = () => {
  //   return (playing = (playing + 1) % 2);
  // };

  return (
    <div className="App">
      <div className="head">Battleship</div>
      <div className="display-boards">
        <div className="my-board">
          <Board cells={gameboard0.board} hits={gameboard0.hits} own/>
        </div>
        <div className="enemy-board">
          <Board cells={gameboard1.board} hits={gameboard1.hits} />
        </div>
      </div>
    </div>
  );
}

export default App;
