import Cell from "./Cell";

const Board = ({ cells, hits, own, onClick }) => {
  return (
    <div className="board-grid">
      {cells.map((cell, i) => {
        return (
          <Cell
            key={i}
            value={cell !== 0}
            own={own ? true : false}
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
