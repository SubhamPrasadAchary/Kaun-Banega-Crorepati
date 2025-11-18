import { useState, useEffect } from 'react';
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (usedLifelines.audiencePoll) {
      openModal();
    }
  }, [usedLifelines.audiencePoll]);

  return (
    <div className="game-container flex flex-col md:flex-row gap-8 p-4">
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-kbc-purple-dark p-4 rounded-lg text-white">
          <h2 className="text-2xl font-bold">Question {currentLevel}</h2>
          <p className="text-kbc-gold text-3xl font-bold mt-2">₹{score.toLocaleString()}</p>
        </div>
        
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
      </div>
      
      <div className="w-full md:w-80">
        <PrizeLadder 
          prizeLadder={prizeLadder} 
          currentLevel={currentLevel} 
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-kbc-purple-dark p-6 rounded-lg max-w-md w-full">
          <h3 className="text-2xl font-bold text-kbc-gold mb-4 text-center">Audience Poll Results</h3>
          <p className="text-white mb-6 text-center">Here's what the audience thinks is the correct answer:</p>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="bg-kbc-purple/50 p-3 rounded-lg">
                <p className="font-bold text-white mb-2">{option}</p>
                <div className="w-full bg-kbc-purple/30 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-kbc-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                  />
                </div>
                <p className="text-right mt-1 text-kbc-gold-light font-medium">
                  {Math.floor(Math.random() * 60) + 20}%
                </p>
              </div>
            ))}
          </div>
          <button 
            onClick={closeModal}
            className="kbc-button w-full mt-6"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
