import { useState } from "react";
import { Player } from "./Player";

const useGame = () => {
  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));
  let playerTurn = human;
  let winner;

  const nextTurn = () => {
    playerTurn = playerTurn === human ? bot : human;
  };

  const calculateWinner = () => {
    const player = playerTurn;
    if (player.gameboard.fleetSunk()) {
      winner = player;
    }
  };

  const handleTurn = (index) => {
    if (human.validAttack(bot, index)) {
      setBot((prevBot) => human.attack(prevBot, index));
    }
  };

  const setGame = (index) => {
    handleTurn(index);
    return {
      human,
      bot,
      winner,
    };
  };

  return [
    {
      human,
      bot,
      winner,
    },
    setGame,
  ];
};

export default useGame;
