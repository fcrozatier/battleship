import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Gameboard from '../modules/Gameboard';

// eslint-disable-next-line no-unused-vars
const Board = ({ fleet, hits, onClick }) => {
  const [gameboard, setGameboard] = useState(Gameboard());

  const handleDrop = (i, id) => {
    setGameboard({ ...gameboard, board: gameboard.reposition(i, id) });
  };

  const drawBoard = () => gameboard.board.map((cell, i) => (
    <Cell
        // eslint-disable-next-line react/no-array-index-key
      key={i}
      value={cell}
      hit={hits.includes(i)}
      onClick={() => {
        if (onClick) {
          onClick(i);
        }
      }}
      onDrop={(id) => handleDrop(i, id)}
    />
  ));

  return (
    <div className="board-grid">
      {/* {cells.map((cell, i) => (
      <Cell
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        value={cell}
        hit={hits.includes(i)}
        onClick={() => {
          if (onClick) {
            onClick(i);
          }
        }}
      />
    ))} */}
      {drawBoard()}
    </div>
  );
};

Board.propTypes = {
  fleet: PropTypes.arrayOf(PropTypes.object),
  hits: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  fleet: [],
  hits: [],
  onClick: () => {},
};

export default Board;
