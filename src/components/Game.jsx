import { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Button, useDisclosure } from '@chakra-ui/react';
import Question from './Question';
import Options from './Options';
import Lifelines from './Lifelines';
import PrizeLadder from './PrizeLadder';
import Modal from './Modal';

const Game = ({ 
  question, 
  prizeLadder, 
  currentLevel, 
  score, 
  onAnswerSelected,
  usedLifelines,
  onUseLifeline
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowCorrectAnswer(true);
    
    setTimeout(() => {
      onAnswerSelected(optionIndex === question.correctAnswer);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
      setFiftyFiftyUsed(false);
    }, 2000);
  };

  const useFiftyFifty = () => {
    if (usedLifelines.fiftyFifty) return;
    onUseLifeline('fiftyFifty');
    setFiftyFiftyUsed(true);
  };

  const useAudiencePoll = () => {
    if (usedLifelines.audiencePoll) return;
    onUseLifeline('audiencePoll');
    onOpen();
  };

  const useFlipQuestion = () => {
    if (usedLifelines.flipQuestion) return;
    onUseLifeline('flipQuestion');
    // Logic to flip to a new question would go here
  };

  return (
    <HStack alignItems="flex-start" spacing={8}>
      {/* Left side - Game area */}
      <Box flex="1">
        <VStack spacing={6} align="stretch">
          <Box bg="blue.900" p={4} borderRadius="md" color="white">
            <Text fontSize="xl" fontWeight="bold">Question {currentLevel}</Text>
            <Text fontSize="2xl" mt={2} fontWeight="bold">₹{score.toLocaleString()}</Text>
          </Box>
          
          <Question 
            text={question.question} 
            currentLevel={currentLevel} 
          />
          
          <Options 
            options={question.options}
            correctAnswer={question.correctAnswer}
            selectedOption={selectedOption}
            showCorrectAnswer={showCorrectAnswer}
            onSelect={handleAnswerSelect}
            fiftyFiftyUsed={fiftyFiftyUsed}
          />
          
          <Lifelines 
            usedLifelines={usedLifelines}
            onFiftyFifty={useFiftyFifty}
            onAudiencePoll={useAudiencePoll}
            onFlipQuestion={useFlipQuestion}
          />
        </VStack>
      </Box>
      
      {/* Right side - Prize ladder */}
      <Box w="300px" bg="gray.100" p={4} borderRadius="md" position="sticky" top="20px">
        <PrizeLadder 
          prizeLadder={prizeLadder} 
          currentLevel={currentLevel} 
        />
      </Box>

      {/* Audience Poll Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Audience Poll">
        <VStack spacing={4}>
          {question.options.map((option, index) => (
            <Box key={index} w="100%" bg="blue.50" p={3} borderRadius="md">
              <Text fontWeight="bold">{option}</Text>
              <Box 
                bg="green.400" 
                h="20px" 
                mt={2} 
                borderRadius="md"
                width={`${Math.floor(Math.random() * 60) + 20}%`}
              />
              <Text textAlign="right" mt={1}>
                {Math.floor(Math.random() * 60) + 20}%
              </Text>
            </Box>
          ))}
        </VStack>
      </Modal>
    </HStack>
  );
};

export default Game;
