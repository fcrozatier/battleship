import Board  from "./Board";
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
          <Board gameboard={gameboard0} own/>
        </div>
        <div className="enemy-board">
          <Board gameboard={gameboard1} />
        </div>
      </div>
    </div>
  );
}

export default App;
