import { PropTypes } from 'prop-types';
import React from 'react';
import { useDrag } from 'react-dnd';
import { GiNuclearBomb } from 'react-icons/gi';

function Ship({ hit, unit }) {
  const style = hit ? 'ship hit' : 'ship';
  const [, drag] = useDrag({
    item: { type: 'ship', id: unit.ship.id },
  });
  return <div className={style} ref={drag}>{hit && <GiNuclearBomb />}</div>;
}

Ship.propTypes = {
  hit: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  unit: PropTypes.object,
};

Ship.defaultProps = {
  hit: false,
  unit: {},
};

export default Ship;
