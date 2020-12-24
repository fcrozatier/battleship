import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

function DashBoard({ player1, player2, handleClick }) {
  return (
    <div className="display-boards">
      <div className="my-board">
        <Board
          gameboardProp={player1.gameboard}
          hits={player1.gameboard.hits}
        />
        <div className="info">
          Ships left:
          {player1.gameboard.shipsLeft()}
        </div>
      </div>
      <div className="enemy-board">
        <Board
          gameboardProp={player2.gameboard}
          hits={player2.gameboard.hits}
          onClick={handleClick}
        />
        <div className="info">
          Ships left:
          {player2.gameboard.shipsLeft()}
        </div>
      </div>
    </div>
  );
}

DashBoard.propTypes = {
  player1: PropTypes.shape().isRequired,
  player2: PropTypes.shape().isRequired,
  handleClick: PropTypes.func,
};

DashBoard.defaultProps = {
  handleClick: () => {},
};

export default DashBoard;
