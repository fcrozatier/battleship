import Cell from "./Cell";

const Board = ({ cells, hits, own, onClick }) => {
  return (
    <div className="board-grid">
      {cells.map((cell, i) => {
        const value = cell !== 0;
        return (
          <Cell
            key={i}
            value={value}
            own={own}
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
