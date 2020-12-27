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

  const reset = (num) => {
    setPlayers(num);
    setGameboards(0);
    setPlayer1(Player('Player1'));
    setPlayer2(Player(num === 2 ? 'Player2' : 'AI'));
    setPlayer1Turn(true);
  };

  const switchPlayers = () => {
    setPlayer1Turn((prev) => !prev);
  };

  const winner = () => {
    if (player2.hasLost()) return player1.name;
    if (player1.hasLost()) return player2.name;
    return false;
  };

  const setGame = (index) => {
    const gameEnded = !!winner();
    if (players === 1) {
      const player2Pass = !player1.validAttack(player2, index) || gameEnded;
      setMessage(player2Pass ? 'Try again!' : '');
      setPlayer2({
        ...player2,
        gameboard: player1.attack(player2, index, gameEnded),
      });
      setPlayer1({
        ...player1,
        gameboard: player2.attack(player1, player2Pass),
      });
    } else if (players === 2) {
      const playing = player1Turn ? player1 : player2;
      const opponent = player1Turn ? player2 : player1;
      const setMap = player1Turn ? setPlayer2 : setPlayer1;
      const keepPlaying = !playing.validAttack(opponent, index);
      setMessage(keepPlaying ? 'Try again!' : '');
      setMap({
        ...opponent,
        gameboard: playing.attack(opponent, index, gameEnded),
      });
      if (!keepPlaying && !winner()) switchPlayers();
    }
  };

  return [
    {
      gameboards,
      message,
      players,
      player1,
      player2,
      player1Turn,
      reset,
      setGameboards,
      setPlayers,
      setPlayer1,
      setPlayer2,
      switchPlayers,
      winner,
    },
    setGame,
  ];
};

export default useGame;
