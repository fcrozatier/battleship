import Cell from "./Cell";

const Board = ({ cells, hits, own, onClick }) => {
  return (
    <div className="board-grid">
      {cells.map((cell, i) => {
        return (
          <Cell
            key={i}
            value={cell}
            own={own}
            hit={hits.includes(cell)}
            onClick={() => onClick(i)}
          />
        );
      })}
    </div>
  );
};
export default Board;
