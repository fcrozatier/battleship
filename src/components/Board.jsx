import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Gameboard from '../modules/Gameboard';

const Board = ({
  boardInit,
  dnd,
  // eslint-disable-next-line no-unused-vars
  fleet,
  hits,
  onClick,
}) => {
  const [gameboard, setGameboard] = useState(Gameboard());

  const handleDrop = (i, id) => {
    setGameboard({ ...gameboard, fleet: gameboard.reposition(i, id) });
  };

  const handleRotate = (id) => {
    setGameboard({ ...gameboard, fleet: gameboard.rotate(id) });
  };

  const handleRandom = () => {
    setGameboard({ ...gameboard, fleet: gameboard.positionAtRandom() });
  };

  const drawBoard = () => {
    const board = gameboard.createBoard();
    return board.map((cell, i) => (
      <Cell
        key={Math.random() * 1000}
        value={cell}
        hit={hits.includes(i)}
        onClick={() => {
          if (onClick) {
            onClick(i);
          }
        }}
        onDrop={(id) => handleDrop(i, id)}
        onCanDrop={(id) => gameboard.canReposition(i, id)}
        onCanRotate={(id) => gameboard.canRotate(id)}
        onRotate={(id) => handleRotate(id)}
      />
    ));
  };

  return (
    <>
      <div className={`board-grid ${dnd ? 'dnd-board' : ''}`}>
        {drawBoard()}
      </div>
      {dnd && (
        <div className="btn-wrapper">
          <button className="btn" type="button" onClick={handleRandom}>
            Random
          </button>

          <button className="btn" type="button" onClick={() => boardInit(gameboard)}>
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
  fleet: PropTypes.arrayOf(PropTypes.object),
  hits: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  boardInit: () => {},
  dnd: false,
  fleet: [],
  hits: [],
  onClick: () => {},
};

export default Board;
