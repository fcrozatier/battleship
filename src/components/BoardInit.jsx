import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

function BoardInit({ onBoardInit }) {
  return (
    <>
      <Board dnd boardInit={onBoardInit} />
    </>
  );
}

BoardInit.propTypes = {
  onBoardInit: PropTypes.func,
};

BoardInit.defaultProps = {
  onBoardInit: () => {},
};

export default BoardInit;
