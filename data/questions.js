export const questions = [
  // Level 1 - Easy
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2, // Paris
    amount: 1000
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1, // Mars
    amount: 1000
  },
  // Add more questions for each level...
  {
    id: 20,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2, // Leonardo da Vinci
    amount: 5000000
  },
  {
    id: 21,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Aluminum", "Argon"],
    correctAnswer: 1, // Gold
    amount: 7000000
  }
];

// Prize ladder for 21 levels
export const prizeLadder = [
  { level: 1, amount: 1000, isMilestone: false }, 
  { level: 2, amount: 2000, isMilestone: false },
  { level: 3, amount: 3000, isMilestone: false },
  { level: 4, amount: 5000, isMilestone: true },
  { level: 5, amount: 10000, isMilestone: false },
  { level: 6, amount: 20000, isMilestone: false },
  { level: 7, amount: 40000, isMilestone: false },
  { level: 8, amount: 80000, isMilestone: true },
  { level: 9, amount: 160000, isMilestone: false },
  { level: 10, amount: 320000, isMilestone: false },
  { level: 11, amount: 640000, isMilestone: true },
  { level: 12, amount: 1250000, isMilestone: false },
  { level: 13, amount: 2500000, isMilestone: false },
  { level: 14, amount: 5000000, isMilestone: true },
  { level: 15, amount: 7000000, isMilestone: false },
  // Add more levels as needed
];
