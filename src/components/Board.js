import Cell from "./Cell";

const Board = ({ cells, hits, onClick }) => {
  return (
    <div className="board-grid">
      {cells.map((cell, i) => {
        return (
          <Cell
            key={i}
            value={cell !== 0}
            hit={hits.includes(i)}
            onClick={() => {
              if (onClick) {
                onClick(i);
              }
            }}
          />
        );
      })}
    </div>
  );
};
export default Board;
