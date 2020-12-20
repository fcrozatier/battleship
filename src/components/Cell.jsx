import React from 'react';
import PropTypes from 'prop-types';
import { GiNuclearBomb } from 'react-icons/gi';
import Ship from './Ship';

function Cell({ value, hit, onClick }) {
  const style = hit ? 'cell hit' : 'cell';
  // const style = value !== 0 ? `${base} ship` : base;

  return (
    <div
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
