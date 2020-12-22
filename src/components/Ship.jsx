import React from 'react';
import { PropTypes, bool } from 'prop-types';
import { useDrag } from 'react-dnd';
import { GiNuclearBomb } from 'react-icons/gi';
import { GrRotateLeft } from 'react-icons/gr';

function Ship({
  hit, unit, canRotate, rotate,
}) {
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
    <div
      style={style}
      className={classes}
      ref={drag}
      onDoubleClick={() => rotate()}
    >
      {canRotate && (
        <GrRotateLeft
          style={{ marginLeft: '8px', marginTop: '8px', fontSize: '24px' }}
        />
      )}
      {hit && <GiNuclearBomb />}
    </div>
  );
}

Ship.propTypes = {
  canRotate: bool,
  hit: PropTypes.bool,
  rotate: PropTypes.func,
  unit: PropTypes.shape({
    index: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    ship: PropTypes.object,
    v: PropTypes.bool,
  }),
};

Ship.defaultProps = {
  canRotate: false,
  hit: false,
  rotate: () => {},
  unit: {},
};

export default Ship;
