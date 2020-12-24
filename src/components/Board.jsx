import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Gameboard from '../modules/Gameboard';

const Board = ({
  boardInit,
  dnd,
  gameboardProp,
  gameboards,
  onClick,
}) => {
  const [gameboard, setGameboard] = useState(gameboardProp);

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
    const { hits } = gameboard;
    return board.map((cell, i) => (
      <Cell
        key={Math.random() * 1000}
        unit={cell}
        drawShip={gameboard.unitIndices().includes(i)}
        hit={hits.includes(i)}
        onClick={() => {
          if (onClick) {
            onClick(i);
          }
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
      <div className={`board-grid ${dnd ? 'dnd-board' : ''}`}>
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
            onClick={() => boardInit(gameboards + 1, gameboard)}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

Board.propTypes = {
  // run this function to initialize
  boardInit: PropTypes.func,
  dnd: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  gameboardProp: PropTypes.object,
  // number of gameboards initialized
  gameboards: PropTypes.number,
  onClick: PropTypes.func,
};

Board.defaultProps = {
  boardInit: () => {},
  dnd: false,
  gameboards: 0,
  gameboardProp: Gameboard(),
  onClick: () => {},
};

export default Board;
