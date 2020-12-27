import React from "react";
import { PropTypes, bool } from "prop-types";
import { useDrag } from "react-dnd";
import { GrRotateLeft } from "react-icons/gr";

function Ship({ dnd, unit, canRotate, rotate }) {
  const style = unit.v
    ? {
        width: "42px",
        height: `${unit.ship.length * 41}px`,
      }
    : {
        width: `${unit.ship.length * 41}px`,
        height: "42px",
      };

  const [, drag] = useDrag({
    item: { type: "ship", id: unit.ship.id },
  });

  const dndFeatures = dnd ? { ref: drag, onDoubleClick: () => rotate() } : {};

  return (
    <div style={style} className="ship" {...dndFeatures}>
      {dnd && canRotate && (
        <GrRotateLeft
          style={{ marginLeft: "8px", marginTop: "8px", fontSize: "24px" }}
        />
      )}
    </div>
  );
}

Ship.propTypes = {
  dnd: PropTypes.bool,
  canRotate: bool,
  rotate: PropTypes.func,
  unit: PropTypes.shape({
    index: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    ship: PropTypes.object,
    v: PropTypes.bool,
  }),
};

Ship.defaultProps = {
  dnd: false,
  canRotate: false,
  rotate: () => {},
  unit: {},
};

export default Ship;
