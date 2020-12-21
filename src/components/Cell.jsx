import React from 'react';
import PropTypes from 'prop-types';
import { GiNuclearBomb } from 'react-icons/gi';
import { useDrop } from 'react-dnd';
import Ship from './Ship';

function Cell({ value, hit, onClick }) {
  const style = hit ? 'cell hit' : 'cell';

  const [, drop] = useDrop({
    accept: 'ship',
    drop: () => {

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
      {value !== 0 && <Ship value={value} hit={hit} />}
      {value === 0 && hit && <GiNuclearBomb />}
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.bool,
  hit: PropTypes.bool,
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  value: false,
  hit: false,
  onClick: () => {},
};

export default Cell;
