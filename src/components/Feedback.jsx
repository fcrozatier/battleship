import React from 'react';
import PropTypes from 'prop-types';

function Feedback({
  players, gameboards, info, player1Turn, winner,
}) {
  let message;
  if (!players) {
    message = <h2 className="heading">Battlefied</h2>;
  } else if (players && gameboards !== players) {
    message = (
      <>
        <h2 className="heading">
          Player
          {gameboards + 1}
          {': '}
          place your ships
        </h2>
        <div className="info-wrapper">
          <ul className="info">
            <li>Drag&apos;n drop to move</li>
            <li>Double click to rotate</li>
          </ul>
        </div>
      </>
    );
  } else if (players && gameboards === players && !winner) {
    message = (
      <>
        <h2 className="heading">
          Player
          {player1Turn ? '1 ' : '2 '}
          turn
        </h2>
        <p className="info-wrapper">{info}</p>
      </>
    );
  } else if (winner) {
    message = (
      <>
        <h2 className="heading">
          {winner}
          {' '}
          wins!
        </h2>
        <small className="info-wrapper">Click below to rematch</small>
      </>
    );
  }
  return <header className="feedback">{message}</header>;
}

Feedback.propTypes = {
  gameboards: PropTypes.number,
  info: PropTypes.string,
  player1Turn: PropTypes.bool,
  players: PropTypes.number,
  winner: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Feedback.defaultProps = {
  gameboards: 0,
  info: '',
  player1Turn: true,
  players: 0,
  winner: false,
};

export default Feedback;
