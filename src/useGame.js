import { useState } from 'react';
import Player from './Player';

const useGame = () => {
  let botPass = false;

  const [human, setHuman] = useState(Player(false));
  const [bot, setBot] = useState(Player(true));

  let winner;

  const setGame = (index) => {
    botPass = !human.validAttack(bot, index);
    setBot({ ...bot, gameboard: human.attack(bot, index) });
    setHuman({ ...human, gameboard: bot.attack(human, botPass) });
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
