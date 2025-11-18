import { ChakraProvider, Box, Heading, Button, VStack } from '@chakra-ui/react';
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

  if (gameOver) {
    return (
      <Box textAlign="center" py={20}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" mb={8}>Game Over!</Heading>
          <Text fontSize="xl">Your final score: ₹{score.toLocaleString()}</Text>
          <Button 
            colorScheme="yellow" 
            size="lg" 
            onClick={resetGame}
            px={10}
            py={6}
            fontSize="xl"
          >
            Play Again
          </Button>
        </VStack>
      </Box>
    );
  }

  if (!gameStarted) {
    return (
      <Box textAlign="center" py={20}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" mb={8}>Kaun Banega Crorepati</Heading>
          <Button 
            colorScheme="yellow" 
            size="lg" 
            onClick={startGame}
            px={10}
            py={6}
            fontSize="xl"
          >
            Start Game
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={4} maxW="1200px" mx="auto">
      {shuffledQuestions.length > 0 && (
        <Game 
          question={shuffledQuestions[currentQuestionIndex]}
          prizeLadder={prizeLadder}
          currentLevel={currentQuestionIndex + 1}
          score={score}
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
      )}
    </Box>
  );
}

export default App;
