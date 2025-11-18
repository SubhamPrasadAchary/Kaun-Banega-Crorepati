import { useState, useEffect } from 'react';
import Game from './components/Game';
import { questions, prizeLadder } from './data/questions';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [usedLifelines, setUsedLifelines] = useState({
    fiftyFifty: false,
    audiencePoll: false,
    flipQuestion: false
  });

  const startGame = () => {
    setGameStarted(true);
    // Shuffle questions for random selection
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setUsedLifelines({
      fiftyFifty: false,
      audiencePoll: false,
      flipQuestion: false
    });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kbc-gradient p-4">
        <div className="kbc-card max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-kbc-gold mb-8 font-display">
            Kaun Banega Crorepati
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Test your knowledge and win up to ₹7,00,000!
          </p>
          <button
            onClick={startGame}
            className="kbc-button text-lg px-8 py-4"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kbc-gradient p-4">
        <div className="kbc-card max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-kbc-gold mb-8 font-display">
            Game Over!
          </h1>
          <p className="text-2xl text-white mb-8">
            Your final score: ₹{score.toLocaleString('en-IN')}
          </p>
          <button
            onClick={resetGame}
            className="kbc-button text-lg px-8 py-4"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kbc-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="text-kbc-gold font-bold text-xl md:text-2xl">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="text-kbc-gold-light font-bold text-xl md:text-2xl">
            ₹{shuffledQuestions[currentQuestionIndex]?.amount.toLocaleString('en-IN') || '0'}
          </div>
        </header>
        
        <Game
          question={shuffledQuestions[currentQuestionIndex]}
          onNext={nextQuestion}
          onEnd={endGame}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          prizeLadder={prizeLadder}
          currentPrize={shuffledQuestions[currentQuestionIndex]?.amount || 0}
          onAnswerSelected={(isCorrect) => {
            if (isCorrect) {
              const newScore = prizeLadder[currentQuestionIndex]?.amount || 0;
              setScore(newScore);
              nextQuestion();
            } else {
              endGame();
            }
          }}
          usedLifelines={usedLifelines}
          onUseLifeline={(lifeline) => {
            setUsedLifelines(prev => ({ ...prev, [lifeline]: true }));
          }}
        />
      </div>
    </div>
  );
}

export default App;
