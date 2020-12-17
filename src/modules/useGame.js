import { useState } from 'react';
import Player from './Player';

const useGame = () => {
  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));

  const calculateWinner = () => {
    if (bot.hasLost()) return human;
    if (human.hasLost()) return bot;
    return false;
  };

  const setGame = (index) => {
    const botPass = (!human.validAttack(bot, index));
    setBot({ ...bot, gameboard: human.attack(bot, index) });
    setHuman({ ...human, gameboard: bot.attack(human, botPass) });
  };

  return [
    {
      bot,
      human,
      calculateWinner,
    },
    setGame,
  ];
};

export default useGame;
