import { useState } from 'react';

const Lifelines = ({ 
  usedLifelines, 
  onFiftyFifty, 
  onAudiencePoll, 
  onFlipQuestion 
}) => {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  const showTooltip = (e, text) => {
    setTooltip({
      show: true,
      text,
      x: e.target.getBoundingClientRect().left + e.target.offsetWidth / 2,
      y: e.target.getBoundingClientRect().top - 10
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, show: false });
  };

  const LifelineButton = ({ 
    children, 
    isUsed, 
    onClick, 
    tooltipText 
  }) => (
    <div className="relative">
      <button
        className={`lifeline-button flex items-center justify-center px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
          isUsed 
            ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
            : 'bg-kbc-gold/20 text-kbc-gold hover:bg-kbc-gold/30 hover:shadow-lg hover:shadow-kbc-gold/20'
        }`}
        onClick={!isUsed ? onClick : undefined}
        onMouseEnter={(e) => showTooltip(e, tooltipText)}
        onMouseLeave={hideTooltip}
        onFocus={(e) => showTooltip(e, tooltipText)}
        onBlur={hideTooltip}
        disabled={isUsed}
      >
        {children}
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <LifelineButton
          isUsed={usedLifelines.fiftyFifty}
          onClick={onFiftyFifty}
          tooltipText={usedLifelines.fiftyFifty ? "Already used" : "Eliminate two wrong answers"}
        >
          50:50
        </LifelineButton>

        <LifelineButton
          isUsed={usedLifelines.audiencePoll}
          onClick={onAudiencePoll}
          tooltipText={usedLifelines.audiencePoll ? "Already used" : "Ask the audience"}
        >
          Audience Poll
        </LifelineButton>

        <LifelineButton
          isUsed={usedLifelines.flipQuestion}
          onClick={onFlipQuestion}
          tooltipText={usedLifelines.flipQuestion ? "Already used" : "Flip the question"}
        >
          Flip Question
        </LifelineButton>
      </div>

      {tooltip.show && (
        <div 
          className="absolute bg-black/80 text-white text-sm py-1 px-3 rounded-md z-50 whitespace-nowrap"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {tooltip.text}
          <div 
            className="absolute bottom-0 left-1/2 w-2 h-2 bg-black/80 transform -translate-x-1/2 translate-y-1/2 rotate-45"
          />
        </div>
      )}
    </div>
  );
};


