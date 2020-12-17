import React from 'react';
import PropTypes from 'prop-types';
import Player from '../Player';

const Info = ({ winner }) => {
  let content = '';
  if (winner) {
    content = winner.isBot ? 'Computer wins!' : 'You win!';
  }
  return <div className="info-winner">{content}</div>;
};

Info.propTypes = {
  winner: PropTypes.instanceOf(Player),
};

Info.defaultProps = {
  winner: '',
};

export default Info;
