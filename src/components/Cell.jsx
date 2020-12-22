import React from 'react';
import PropTypes from 'prop-types';
import { GiNuclearBomb } from 'react-icons/gi';
import { useDrop } from 'react-dnd';
import Ship from './Ship';

function Cell({
  value,
  hit,
  onClick,
  onDrop,
  onCanDrop,
  onCanRotate,
  onRotate,
}) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'ship',
    drop: (item) => {
      onDrop(item.id);
    },
    canDrop: (item) => onCanDrop(item.id),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  const classes = hit ? 'cell hit' : 'cell';
  const style = {
    backgroundColor: canDrop && 'rgb(248, 249, 231)',
    border:
      (isOver && canDrop && '1px solid green')
      || (isOver && !canDrop && '1px solid red'),
  };
  return (
    <div
      ref={drop}
      style={style}
      className={classes}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="-1"
    >
      {value !== null && (
        <Ship
          unit={value}
          hit={hit}
          canRotate={onCanRotate(value.ship.id)}
          rotate={() => onRotate(value.ship.id)}
        />
      )}
      {value === null && hit && <GiNuclearBomb />}
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hit: PropTypes.bool,
  onClick: PropTypes.func,
  onCanDrop: PropTypes.func,
  onCanRotate: PropTypes.func,
  onDrop: PropTypes.func,
  onRotate: PropTypes.func,
};

Cell.defaultProps = {
  value: false,
  hit: false,
  onClick: () => {},
  onCanDrop: () => {},
  onCanRotate: () => {},
  onDrop: () => {},
  onRotate: () => {},
};

export default Cell;
