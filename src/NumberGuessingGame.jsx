import { useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

/**
 *
 * Returns a random integer number from 1-100 inclusive
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const MAX_ATTEMPTS = 5;

const NumberGuessingGame = () => {
  const [numberToGuess, setNumberToGuess] = useState(getRandomNumber());
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [latestGuess, setLatestGuess] = useState(null);

  const handleGuess = (guess) => {
    // Process guesses only if attempts are below the limit
    if (numberOfGuesses < MAX_ATTEMPTS) {
      setLatestGuess(Number(guess));
      setNumberOfGuesses(numberOfGuesses + 1);
    }
  }
  // Function to reset the game state
  const handleReset = () => {
    setNumberToGuess(getRandomNumber());
    setNumberOfGuesses(0);
    setLatestGuess(null);
  }
  console.log(numberToGuess)
  // Determine if the latest guess is correct
  const isCorrectGuess = latestGuess === numberToGuess;
  // Determine if the game is over
  const isGameOver = isCorrectGuess || numberOfGuesses === MAX_ATTEMPTS;

    return (
      <div>
        <h2>I am thinking of a number from 1 to 100.</h2>
        <h2>
          Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
        </h2>
        {!isGameOver && (
        <GuessControl onGuess={handleGuess} />
        )}
        {isGameOver && (
          <GameOver hasWon={isCorrectGuess} onReset={handleReset} />
        )}
        {!isGameOver && (
          <GuessMessage
            guess={latestGuess}
            numberToGuess={numberToGuess}
            numberOfGuesses={numberOfGuesses}
          />
        )}
      </div>
    );
}

export default NumberGuessingGame;
