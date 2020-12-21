import React from 'react';
import PropTypes from 'prop-types';
import { GiNuclearBomb } from 'react-icons/gi';
import { useDrop } from 'react-dnd';
import Ship from './Ship';

function Cell({
  // eslint-disable-next-line no-unused-vars
  value, hit, onClick, onDrop,
}) {
  const style = hit ? 'cell hit' : 'cell';

  const [, drop] = useDrop({
    accept: 'ship',
    drop: (item) => {
      onDrop(item.id);
    },
  });

  return (
    <div
      ref={drop}
      className={style}
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
  onDrop: PropTypes.func,
};

Cell.defaultProps = {
  value: false,
  hit: false,
  onClick: () => {},
  onDrop: () => {},
};

export default Cell;
