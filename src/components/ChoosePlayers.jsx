import React from "react";
import PropTypes from "prop-types";

function ChoosePlayers({ onClick }) {
  return (
    <div className="btn-wrapper">
      <button className="btn" type="button" onClick={() => onClick(1)}>
        1 Player
      </button>
      <button className="btn" type="button" onClick={() => onClick(2)}>
        2 Players
      </button>
    </div>
  );
}

ChoosePlayers.propTypes = {
  onClick: PropTypes.func,
};

ChoosePlayers.defaultProps = {
  onClick: () => {},
};

export default ChoosePlayers;
