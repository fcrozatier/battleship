import React from "react";
import Battleships from "../img/battleships.png";

function Fleet() {
  return (
    <div className="fleet">
      <div className="fleet-description">
        <p>1x Battleship</p>
        <p>1x Aircraft carrier</p>
        <p>1x Submarine</p>
        <p>1x Destroyer</p>
        <p>1x Patrol boat</p>
      </div>
      <img
        className="fleet-img"
        src={Battleships}
        alt="all battleships"
        width="200px"
      />
    </div>
  );
}

export default Fleet;
