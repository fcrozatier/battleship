import { useState } from 'react';
import Player from './Player';

const useGame = (players, gameboard1, gameboard2) => {
  const [player1, setPlayer1] = useState(Player('Player 1', gameboard1));
  const [player2, setPlayer2] = useState(
    Player(players === 2 ? 'Player 2' : 'AI', gameboard2),
  );

  const calculateWinner = () => {
    if (player2.hasLost()) return player1;
    if (player1.hasLost()) return player2;
    return false;
  };

  const setGame = (index) => {
    const player2Pass = !player1.validAttack(player2, index);
    if (players === 2) {
      setPlayer2({ ...player2, gameboard: player1.attack(player2, index) });
      setPlayer1({ ...player1, gameboard: player2.attack(player1, player2Pass) });
    } else {
      setPlayer2({ ...player2, gameboard: player1.attack(player2, index) });
      setPlayer1({ ...player1, gameboard: player2.attack(player1, player2Pass) });
    }
  };

  return [
    {
      player1,
      player2,
      calculateWinner,
    },
    setGame,
  ];
};

export default useGame;
