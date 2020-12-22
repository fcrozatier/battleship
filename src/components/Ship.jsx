import React from 'react';
import { PropTypes } from 'prop-types';
import { useDrag } from 'react-dnd';
import { GiNuclearBomb } from 'react-icons/gi';

function Ship({ hit, unit }) {
  const classes = hit ? 'ship hit' : 'ship';

  const style = unit.v
    ? {
      width: '42px',
      height: `${unit.ship.length * 41}px`,
    }
    : {
      width: `${unit.ship.length * 41}px`,
      height: '42px',
    };
  const [, drag] = useDrag({
    item: { type: 'ship', id: unit.ship.id },
  });
  return (
    <div style={style} className={classes} ref={drag}>
      {hit && <GiNuclearBomb />}
    </div>
  );
}

Ship.propTypes = {
  hit: PropTypes.bool,
  unit: PropTypes.shape({
    index: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    ship: PropTypes.object,
    v: PropTypes.bool,
  }),
};

Ship.defaultProps = {
  hit: false,
  unit: {},
};

export default Ship;
