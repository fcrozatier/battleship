import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Gameboard from '../modules/Gameboard';

// eslint-disable-next-line no-unused-vars
const Board = ({ fleet, hits, onClick }) => {
  const gameboard = Gameboard();
  const { board } = gameboard;

  // fleet.forEach(({ ship, index, v }) => {
  // TODO fleet needs to check available space, from Gameboard (not using board)
  // });
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
      {board.map((cell, i) => (
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
      ))}
    </div>
  );
};

Board.propTypes = {
  fleet: PropTypes.arrayOf(PropTypes.object),
  // cells: PropTypes.arrayOf(
  //   PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  // ),
  hits: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  fleet: [],
  hits: [],
  onClick: () => {},
};

export default Board;
