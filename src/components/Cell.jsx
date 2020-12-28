import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Ship from "./Ship";

function Cell({
  unit,
  drawShip,
  hit,
  onClick,
  dnd,
  onDrop,
  onCanDrop,
  onCanRotate,
  onRotate,
}) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "ship",
    drop: (item) => {
      onDrop(item.id);
    },
    canDrop: (item) => onCanDrop(item.id),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  let classes = "cell";
  classes += drawShip ? " draw-ship" : "";
  classes += hit ? " hit" : "";

  const style = {
    backgroundColor:
      (!isOver && canDrop && "hsl(150deg 100% 96%)") ||
      (isOver && canDrop && "hsl(150deg 100% 90%)") ||
      (isOver && !canDrop && "hsl(0deg 100% 96%)"),
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
      {unit !== null && (
        <Ship
          dnd={dnd}
          unit={unit}
          canRotate={onCanRotate(unit.ship.id)}
          rotate={() => onRotate(unit.ship.id)}
        />
      )}
    </div>
  );
}

Cell.propTypes = {
  unit: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  drawShip: PropTypes.bool,
  hit: PropTypes.bool,
  onClick: PropTypes.func,
  dnd: PropTypes.bool,
  onCanDrop: PropTypes.func,
  onCanRotate: PropTypes.func,
  onDrop: PropTypes.func,
  onRotate: PropTypes.func,
};

Cell.defaultProps = {
  unit: false,
  drawShip: false,
  hit: false,
  dnd: false,
  onClick: () => {},
  onCanDrop: () => {},
  onCanRotate: () => {},
  onDrop: () => {},
  onRotate: () => {},
};

export default Cell;
