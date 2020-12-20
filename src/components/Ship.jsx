import { PropTypes } from 'prop-types';
import React from 'react';
import { GiNuclearBomb } from 'react-icons/gi';

function Ship({ hit }) {
  const style = hit ? 'ship hit' : 'ship';

  // const item = value;
  return <div className={style}>{hit && <GiNuclearBomb />}</div>;
}

Ship.propTypes = {
  hit: PropTypes.bool,
};

Ship.defaultProps = {
  hit: false,
};

export default Ship;
