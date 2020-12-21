import { PropTypes } from 'prop-types';
import React from 'react';
import { useDrag } from 'react-dnd';
import { GiNuclearBomb } from 'react-icons/gi';

function Ship({ hit }) {
  const style = hit ? 'ship hit' : 'ship';
  const [, drag] = useDrag({
    item: { type: 'ship' },

  });
  return <div className={style} ref={drag}>{hit && <GiNuclearBomb />}</div>;
}

Ship.propTypes = {
  hit: PropTypes.bool,
};

Ship.defaultProps = {
  hit: false,
};

export default Ship;
