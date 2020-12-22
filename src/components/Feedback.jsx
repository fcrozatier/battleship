import React from 'react';
import PropTypes from 'prop-types';

function Feedback({ players }) {
  let message;
  if (players === 0) message = 'Battlefied';
  return (
    <header
      style={{ fontSize: players === 0 ? '50px' : '20px' }}
      className="flex feedback"
    >
      {message}
    </header>
  );
}

Feedback.propTypes = {
  players: PropTypes.number,
};

Feedback.defaultProps = {
  players: 0,
};

export default Feedback;
