import { VStack, Button } from '@chakra-ui/react';

const Options = ({ 
  options, 
  correctAnswer, 
  selectedOption, 
  showCorrectAnswer, 
  onSelect,
  fiftyFiftyUsed
}) => {
  // If 50:50 is used, we'll show only 2 options (1 correct, 1 incorrect)
  const visibleOptions = fiftyFiftyUsed 
    ? [correctAnswer, (correctAnswer + 1) % options.length]
    : [0, 1, 2, 3];

  return (
    <VStack spacing={4} w="100%">
      {visibleOptions.map((index) => {
        const isSelected = selectedOption === index;
        const isCorrect = index === correctAnswer;
        let bgColor = "white";
        let color = "gray.800";
        let borderColor = "gray.200";
        let hoverBg = "gray.50";
        
        if (showCorrectAnswer) {
          if (isSelected) {
            bgColor = isCorrect ? "green.100" : "red.100";
            color = isCorrect ? "green.800" : "red.800";
            borderColor = isCorrect ? "green.300" : "red.300";
          } else if (isCorrect) {
            bgColor = "green.50";
            borderColor = "green.200";
          }
        } else if (isSelected) {
          bgColor = "blue.50";
          borderColor = "blue.300";
        }

        return (
          <Button
            key={index}
            w="100%"
            p={6}
            variant="outline"
            borderColor={borderColor}
            bg={bgColor}
            color={color}
            _hover={{ bg: hoverBg }}
            onClick={() => !showCorrectAnswer && onSelect(index)}
            isDisabled={showCorrectAnswer}
            fontSize="lg"
            textAlign="left"
            justifyContent="flex-start"
          >
            <Text as="span" mr={2} fontWeight="bold">
              {String.fromCharCode(65 + index)}.
            </Text>
            {options[index]}
          </Button>
        );
      })}
    </VStack>
  );
};

export default Options;
