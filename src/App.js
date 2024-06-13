import React, { useEffect, useState } from 'react';
import Hangman from './components/Hangman';
import Confetti from 'react-confetti';
import axios from 'axios';

const endPoint = 'https://hangman-backend-4tfe.onrender.com';

function App() {
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [guessLetter, setGuessLetter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    try {
      const response = await axios.post(endPoint + '/api/game/new');
      setGameId(response.data.id);
      setError(null); // Clear any previous errors
      setGameState(null);
      fetchGameState(response.data.id);
    } catch (err) {
      console.error(err);
      setError('Failed to start a new game');
    }
  }

  const fetchGameState = async (id) => {

    try {
      const response = await axios.get(endPoint + `/api/game/${id}`);
      setGameState(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError('Failed to fetch game state');
    }
  };


  const makeGuess = async (letter) => {

    try {
      const response = await axios.post(
        endPoint + `/api/game/${gameId}/guess`,
        { letter: letter },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setGameState(response.data);
      setError(null); // Clear any previous errors
      setGuessLetter(''); // Clear guess letter after successful guess
    } catch (err) {
      console.error(err);
      setError('Failed to make a guess');
    }
  };


  return (
    <div className="App">
      {gameState && gameState.state === 'Won' &&  <Confetti />}
      <Hangman gameId={gameId} gameState={gameState} guessLetter={guessLetter} makeGuess={makeGuess} startGame={startGame} />
    </div>
  );
}

export default App;
