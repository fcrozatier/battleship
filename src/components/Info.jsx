import React from 'react';
import PropTypes from 'prop-types';
import Player from '../modules/Player';

const Info = ({ winner }) => {
  let content = '';
  if (winner) {
    content = `${winner.name} wins!`;
  }
  return <div className="info-winner">{content}</div>;
};

Info.propTypes = {
  winner: PropTypes.oneOfType([PropTypes.instanceOf(Player), PropTypes.bool]),
};

Info.defaultProps = {
  winner: false,
};

export default Info;
