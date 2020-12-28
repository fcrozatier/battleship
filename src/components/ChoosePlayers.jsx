import React from "react";
import PropTypes from "prop-types";

function ChoosePlayers({ onClick }) {
  return (
    <div className="btn-wrapper">
      <div className="btn-container">
        <button className="btn" type="button" onClick={() => onClick(1)}>
          1 Player
        </button>
      </div>
      <div className="btn-container">
        <button className="btn" type="button" onClick={() => onClick(2)}>
          2 Players
        </button>
      </div>
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
