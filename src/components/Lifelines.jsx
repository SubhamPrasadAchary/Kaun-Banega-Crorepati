import { HStack, Button, Tooltip } from '@chakra-ui/react';

const Lifelines = ({ 
  usedLifelines, 
  onFiftyFifty, 
  onAudiencePoll, 
  onFlipQuestion 
}) => {
  return (
    <HStack spacing={4} justify="center" mt={4}>
      <Tooltip 
        label={usedLifelines.fiftyFifty ? "Already used" : "Eliminate two wrong answers"} 
        placement="top"
      >
        <Button
          colorScheme={usedLifelines.fiftyFifty ? "gray" : "yellow"}
          onClick={onFiftyFifty}
          isDisabled={usedLifelines.fiftyFifty}
          size="lg"
          px={6}
        >
          50:50
        </Button>
      </Tooltip>

      <Tooltip 
        label={usedLifelines.audiencePoll ? "Already used" : "Ask the audience"} 
        placement="top"
      >
        <Button
          colorScheme={usedLifelines.audiencePoll ? "gray" : "yellow"}
          onClick={onAudiencePoll}
          isDisabled={usedLifelines.audiencePoll}
          size="lg"
          px={6}
        >
          Audience Poll
        </Button>
      </Tooltip>

      <Tooltip 
        label={usedLifelines.flipQuestion ? "Already used" : "Flip the question"} 
        placement="top"
      >
        <Button
          colorScheme={usedLifelines.flipQuestion ? "gray" : "yellow"}
          onClick={onFlipQuestion}
          isDisabled={usedLifelines.flipQuestion}
          size="lg"
          px={6}
        >
          Flip Question
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default Lifelines;
