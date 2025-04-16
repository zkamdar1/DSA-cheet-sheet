import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizCard = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [animation, setAnimation] = useState(null);
  const [streak, setStreak] = useState(0);
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setAnimation(null);
  }, [question]);
  
  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === question.correctAnswer;
    
    // Update streak
    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    // Play animation based on correctness
    setAnimation(isCorrect ? 'correct' : 'incorrect');
    
    // Show explanation after a short delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
    
    // Call parent callback
    if (onAnswer) {
      onAnswer(isCorrect);
    }
  };

  const handleNextQuestion = () => {
    if (onAnswer) {
      onAnswer(selectedOption === question.correctAnswer, true);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {streak > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                🔥 {streak} streak
              </span>
            )}
          </span>
          {/* Quiz timer or question counter could go here */}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{question.question}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 rounded-lg text-left border transition-colors ${
              selectedOption === null
                ? 'border-gray-300 hover:border-blue-500 bg-white'
                : selectedOption === index
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : index === question.correctAnswer && isAnswered
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white opacity-50'
            }`}
            onClick={() => handleOptionSelect(index)}
            disabled={isAnswered}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
            animate={
              selectedOption === index && animation === 'correct'
                ? { scale: [1, 1.05, 1], borderColor: ['#10B981', '#10B981', '#10B981'] }
                : selectedOption === index && animation === 'incorrect'
                  ? { scale: [1, 0.95, 1], borderColor: ['#EF4444', '#EF4444', '#EF4444'] }
                  : {}
            }
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                selectedOption === null
                  ? 'bg-gray-200 text-gray-700'
                  : selectedOption === index
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : index === question.correctAnswer && isAnswered
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              
              {isAnswered && (
                <span className="ml-2">
                  {index === question.correctAnswer ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : selectedOption === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{question.explanation}</p>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
              >
                Next Question
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Celebration confetti effect when answer is correct */}
      {animation === 'correct' && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FCD34D', '#10B981', '#3B82F6', '#EC4899'][i % 4],
                top: '-10px',
                left: `${Math.random() * 100}%`
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [`0px`, `${(Math.random() - 0.5) * 200}px`]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: 'easeOut',
                delay: Math.random() * 0.2
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCard; 