import { Box, Text } from '@chakra-ui/react';

const Question = ({ text, currentLevel }) => {
  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="md" 
      boxShadow="md"
      minH="150px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="xl" textAlign="center">{text}</Text>
    </Box>
  );
};

export default Question;
