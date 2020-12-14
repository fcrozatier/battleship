import React from "react";

const Info = ({ winner }) => {
  let content = ''
  if (winner) {
    content = winner.isBot ? `Computer wins!` : "You win!";
  }
  return <div className="info-winner">{content}</div>;
};

export default Info;
