import React from 'react';
import PropTypes from 'prop-types';

function Feedback({ players, gameboards, player1Turn }) {
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
  } else if (players && gameboards === players) {
    message = (
      <>
        <h2 className="heading">
          Player
          {player1Turn ? '1 ' : '2 '}
          turn
        </h2>
      </>
    );
  }
  return <header className="feedback">{message}</header>;
}

Feedback.propTypes = {
  gameboards: PropTypes.number,
  player1Turn: PropTypes.bool,
  players: PropTypes.number,
};

Feedback.defaultProps = {
  gameboards: 0,
  player1Turn: true,
  players: 0,
};

export default Feedback;
