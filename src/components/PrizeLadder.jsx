import { VStack, Text, Box } from '@chakra-ui/react';

const PrizeLadder = ({ prizeLadder, currentLevel }) => {
  return (
    <VStack spacing={2} align="stretch">
      <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="center">
        Prize Ladder
      </Text>
      {[...prizeLadder].reverse().map((prize, index) => {
        const isCurrent = prize.level === currentLevel;
        const isPast = prize.level < currentLevel;
        const isMilestone = prize.isMilestone;
      
        return (
          <Box
            key={prize.level}
            bg={isCurrent ? "yellow.100" : isPast ? "green.50" : "white"}
            p={3}
            borderRadius="md"
            borderWidth="1px"
            borderColor={isMilestone ? "yellow.300" : "gray.200"}
            borderLeftWidth={isMilestone ? "4px" : "1px"}
            borderLeftColor={isMilestone ? "yellow.500" : "gray.200"}
            fontWeight={isCurrent || isMilestone ? "bold" : "normal"}
            color={isCurrent ? "yellow.800" : isPast ? "green.800" : "gray.800"}
          >
            <Text>
              {prize.level}. ₹{prize.amount.toLocaleString()}
              {isCurrent && " (Current)"}
              {isMilestone && " ✓"}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
};

export default PrizeLadder;
