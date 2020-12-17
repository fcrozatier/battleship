import { useState } from 'react';
import Player from './Player';

const useGame = () => {
  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));

  // let botPass = false;
  let winner = false;

  const calculateWinner = () => {
    if (bot.hasLost()) winner = human;
    if (human.hasLost()) winner = bot;
  };

  const setGame = (index) => {
    const humanPass = winner;
    setBot({ ...bot, gameboard: human.attack(bot, index, humanPass) });
    calculateWinner();

    const botPass = !human.validAttack(bot, index) || winner;
    setHuman({ ...human, gameboard: bot.attack(human, botPass) });
    calculateWinner();
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
