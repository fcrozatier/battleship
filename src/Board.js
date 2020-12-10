import "./board.css";

const Board = ({ gameboard, own }) => {
  return (
    <div className="board-grid">
      {own ? (
        <PlayerBoard gameboard={gameboard} />
      ) : (
        <OpponentBoard gameboard={gameboard} />
      )}
    </div>
  );
};

const PlayerBoard = ({ gameboard }) => {
  return gameboard.board.map((cell, index) => {
    return (
      <div className="board-cell" key={index}>
        {cell === 0 ? "" : "S"}
      </div>
    );
  });
};

const OpponentBoard = ({gameboard}) => {
  return gameboard.board.map((cell, index) => {
    let content = "";

    if (gameboard.hits.includes(cell)) {
      content = "X"
    }

    if (gameboard.hits.includes(cell)) {
      content = "M"
    }

    return (
      <div className="board-cell" key={index}>
        {content}
      </div>
    );
  });
}


export default Board;
