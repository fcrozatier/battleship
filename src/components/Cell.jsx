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
      {value !== 0 && <Ship ship={value} hit={hit} />}
      {value === 0 && hit && <GiNuclearBomb />}
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  hit: PropTypes.bool,
  onClick: PropTypes.func,
  onCanDrop: PropTypes.func,
  onDrop: PropTypes.func,
};

Cell.defaultProps = {
  value: false,
  hit: false,
  onClick: () => {},
  onDrop: () => {},
  onCanDrop: () => {},
};

export default Cell;
