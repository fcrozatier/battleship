import React from 'react';
import PropTypes from 'prop-types';

function Feedback({ players, gameboards }) {
  let message;
  if (players === 0) message = <h2 className="heading">Battlefied</h2>;
  if (players !== 0 && gameboards !== players) {
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
  }
  return (
    <header
      className="feedback"
    >
      {message}
    </header>
  );
}

Feedback.propTypes = {
  gameboards: PropTypes.number,
  players: PropTypes.number,
};

Feedback.defaultProps = {
  gameboards: 0,
  players: 0,
};

export default Feedback;
