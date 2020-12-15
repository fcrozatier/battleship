import Board from "./components/Board";
import useGame from "./useGame";
import "./app.css";
import Info from "./components/Info";

function App() {
  console.log("render");
  // const { bot, human, handleTurn, winner } = useGame();
  const [game, setGame] = useGame();
  const { bot, human, winner } = game;
  const myBoard = human.gameboard;
  const aiBord = bot.gameboard;

  const handleClick = (index) => {
    setGame(index);
  };

  return (
    <div className="App">
      <div className="head">Battleship</div>
      <Info winner={winner} />
      <div className="display-boards">
        <div className="my-board">
          <Board cells={myBoard.board} hits={myBoard.hits} />
          <div className="info">Ships left: {myBoard.shipsLeft()}</div>
        </div>
        <div className="enemy-board">
          <Board
            cells={aiBord.board}
            hits={aiBord.hits}
            onClick={handleClick}
          />
          <div className="info">Ships left: {aiBord.shipsLeft()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
