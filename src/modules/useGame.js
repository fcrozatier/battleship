import { useState } from 'react';
import Player from './Player';

const useGame = () => {
  const [players, setPlayers] = useState(0);
  const [gameboards, setGameboards] = useState(0);
  const [player1, setPlayer1] = useState(Player('Player1'));
  const [player2, setPlayer2] = useState(
    Player(players === 2 ? 'Player2' : 'AI'),
  );
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [message, setMessage] = useState('');

  const switchPlayers = () => {
    setPlayer1Turn((prev) => !prev);
  };

  const calculateWinner = () => {
    if (player2.hasLost()) return player1;
    if (player1.hasLost()) return player2;
    return false;
  };

  const setGame = (index) => {
    if (player1Turn) {
      const player2Pass = !player1.validAttack(player2, index);
      setMessage(player2Pass ? 'Try again another one!' : '');
      setPlayer2({ ...player2, gameboard: player1.attack(player2, index) });
      setPlayer1({
        ...player1,
        gameboard: player2.attack(player1, player2Pass),
      });
    }
  };

  return [
    {
      calculateWinner,
      gameboards,
      message,
      players,
      player1,
      player2,
      player1Turn,
      setGameboards,
      setPlayers,
      setPlayer1,
      setPlayer2,
      switchPlayers,
    },
    setGame,
  ];
};

export default useGame;
