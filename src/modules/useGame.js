import { useState } from 'react';
import Player from './Player';

const useGame = (players) => {
  const [player1, setPlayer1] = useState(Player(false, 'Player 1'));
  const [player2, setPlayer2] = useState(
    Player(players !== 2, players === 2 ? 'Player 2' : 'AI'),
  );
  const [bot, setBot] = useState(Player(true, 'AI'));

  const calculateWinner = () => {
    if (player2.hasLost()) return player1;
    if (player1.hasLost()) return player2;
    return false;
  };

  const setGame = (index) => {
    const botPass = !player1.validAttack(player2, index);
    if (players === 2) {
      setPlayer2({ ...player2, gameboard: player1.attack(player2, index) });
      setPlayer1({ ...player1, gameboard: player2.attack(player1, botPass) });
    } else {
      setBot({ ...bot, gameboard: player1.attack(bot, index) });
      setPlayer1({ ...player1, gameboard: bot.attack(player1, botPass) });
    }
  };

  return [
    {
      bot,
      player1,
      player2,
      calculateWinner,
    },
    setGame,
  ];
};

export default useGame;
