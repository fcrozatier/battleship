import { useState } from 'react';
import Player from './Player';

const useGame = () => {
  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));
  // let playerTurn = human;
  let winner;

  // const nextTurn = () => {
  //   playerTurn = playerTurn === human ? bot : human;
  // };

  // const calculateWinner = () => {
  //   const player = playerTurn;
  //   if (player.gameboard.fleetSunk()) {
  //     winner = player;
  //   }
  // };

  const setGame = (index) => {
    setBot((prevBot) => human.attack(prevBot, index));
    setHuman(human);
  };

  return [
    {
      bot,
      human,
      winner,
    },
    setGame,
  ];
};

export default useGame;
