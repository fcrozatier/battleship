import React from "react";
import { PropTypes, bool } from "prop-types";
import { useDrag } from "react-dnd";
import { GiAnticlockwiseRotation } from "react-icons/gi";

function Ship({ dnd, unit, canRotate, rotate }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "ship", id: unit.ship.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dndFeatures = dnd ? { ref: drag, onDoubleClick: () => rotate() } : {};

  let style = unit.v
    ? {
        width: "80%",
        height: `${unit.ship.length * (40 + 3) - 10}px`,
        top: "10%",
        left: "10%",
      }
    : {
        width: `${unit.ship.length * (40 + 3) - 10}px`,
        height: "80%",
        top: "10%",
        left: "10%",
      };

  style = isDragging ? { ...style, display: "none" } : style;

  return (
    <div style={style} className="ship" {...dndFeatures}>
      {dnd && canRotate && (
        <GiAnticlockwiseRotation
          style={{
            color: "#fff",
            fontSize: "22px",
            position: "relative",
            top: "-3px",
            left: "5px",
          }}
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
