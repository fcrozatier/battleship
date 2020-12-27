import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

function DashBoard({ player1, player2, player1Turn, handleClick }) {
  return (
    <div className="display-boards">
      <div className={`${player1Turn ? "my-board" : "enemy-board"}`}>
        <div className="whose-board">{`${player1.name} board`}</div>
        <Board gameboard={player1.gameboard} onClick={handleClick} />
        <div className="info">
          Ships left:
          {player1.gameboard.shipsLeft()}
        </div>
      </div>
      <div className={`${player1Turn ? "enemy-board" : "my-board"}`}>
        <div className="whose-board">{`${player2.name} board`}</div>
        <Board gameboard={player2.gameboard} onClick={handleClick} />
        <div className="info">
          Ships left:
          {player2.gameboard.shipsLeft()}
        </div>
      </div>
    </div>
  );
}

DashBoard.propTypes = {
  player1Turn: PropTypes.bool,
  player1: PropTypes.shape().isRequired,
  player2: PropTypes.shape().isRequired,
  handleClick: PropTypes.func,
};

DashBoard.defaultProps = {
  player1Turn: true,
  handleClick: () => {},
};

export default DashBoard;
