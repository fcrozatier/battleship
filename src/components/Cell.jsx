import React from 'react';
import PropTypes from 'prop-types';
import { GiNuclearBomb } from 'react-icons/gi';

function Cell({ value, hit, onClick }) {
  const base = hit ? 'cell hit' : 'cell';
  const style = value ? `${base} ship` : base;

  return (
    <div
      className={style}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="-1"
      draggable={!!value}
    >
      {hit && <GiNuclearBomb />}
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
