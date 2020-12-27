import React from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import Gameboard from "../modules/Gameboard";

const Board = ({ boardInit, dnd, gameboard, onClick, updateBoard }) => {
  const handleDrop = (i, id) => {
    updateBoard({ ...gameboard, fleet: gameboard.reposition(i, id) });
  };

  const handleRotate = (id) => {
    updateBoard({ ...gameboard, fleet: gameboard.rotate(id) });
  };

  const handleRandom = () => {
    updateBoard({ ...gameboard, fleet: gameboard.randomize() });
  };

  const drawBoard = () => {
    const board = gameboard.createBoard();
    const { hits } = gameboard;
    return board.map((cell, i) => (
      <Cell
        key={Math.random() * 1000}
        unit={cell}
        drawShip={gameboard.unitIndices().includes(i)}
        hit={hits.includes(i)}
        onClick={() => {
          onClick(i);
        }}
        dnd={dnd}
        onDrop={(id) => handleDrop(i, id)}
        onCanDrop={(id) => gameboard.canReposition(i, id)}
        onCanRotate={(id) => gameboard.canRotate(id)}
        onRotate={(id) => handleRotate(id)}
      />
    ));
  };

  return (
    <>
      <div className={`board-grid ${dnd ? "dnd-board" : ""}`}>
        {drawBoard()}
      </div>
      {dnd && (
        <div className="btn-wrapper">
          <button className="btn" type="button" onClick={handleRandom}>
            Random
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => boardInit(gameboard)}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

Board.propTypes = {
  boardInit: PropTypes.func,
  dnd: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  gameboard: PropTypes.object,
  onClick: PropTypes.func,
  updateBoard: PropTypes.func,
};

Board.defaultProps = {
  boardInit: () => {},
  dnd: false,
  gameboard: Gameboard(),
  onClick: () => {},
  updateBoard: () => {},
};

export default Board;
