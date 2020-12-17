import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Board = ({ cells, hits, onClick }) => (
  <div className="board-grid">
    {cells.map((cell, i) => (
      <Cell
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        value={cell !== 0}
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

Board.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  ).isRequired,
  hits: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  hits: [],
  onClick: () => {},
};

export default Board;
