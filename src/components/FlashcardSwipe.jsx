import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  initializeCard, 
  updateCardAfterReview, 
} from '../utils/spacedRepetition';
import { useUserProgress } from '../context/UserProgressContext';

const FlashcardSwipe = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(null);
  const [swipePower, setSwipePower] = useState(0);
  const cardControls = useAnimation();
  const dragConstraintsRef = useRef(null);
  const { userProgress, setUserProgress, addXp } = useUserProgress();
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleDragEnd = (_, info) => {
    const threshold = 100;
    const velocity = 0.5;
    
    // Calculate swipe power based on drag velocity and distance
    const power = Math.abs(info.offset.x) * Math.abs(info.velocity.x);
    setSwipePower(power);
    
    if (info.offset.x > threshold && info.velocity.x > velocity) {
      // Swiped right - "mastered"
      handleSwipeRight();
    } else if (info.offset.x < -threshold && info.velocity.x < -velocity) {
      // Swiped left - "needs review"
      handleSwipeLeft();
    } else {
      // Reset to center
      cardControls.start({ x: 0, rotate: 0 });
    }
  };
  
  const handleSwipeLeft = async () => {
    setDirection('left');
    
    // Animate card off screen to the left
    await cardControls.start({ x: '-100vw', rotate: -10, transition: { duration: 0.3 } });
    
    // Update spacing info for "needs review"
    if (cards[currentIndex]) {
      const cardId = cards[currentIndex].id;
      const currentCardInfo = userProgress.flashcardMastery[cardId] || initializeCard(cardId, cards[currentIndex].difficulty);
      const updatedCardInfo = updateCardAfterReview(currentCardInfo, 'AGAIN');
      
      // Update context state directly
      setUserProgress(prev => ({
        ...prev,
        flashcardMastery: {
          ...prev.flashcardMastery,
          [cardId]: updatedCardInfo
        }
      }));
      
      // Add a small amount of XP for reviewing
      addXp(5);
    }
    
    // Move to next card
    setIsFlipped(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
    cardControls.set({ x: 0, rotate: 0 });
    setDirection(null);
  };
  
  const handleSwipeRight = async () => {
    setDirection('right');
    
    // Animate card off screen to the right
    await cardControls.start({ x: '100vw', rotate: 10, transition: { duration: 0.3 } });
    
    // Update spacing info for "mastered"
    if (cards[currentIndex]) {
      const cardId = cards[currentIndex].id;
      const currentCardInfo = userProgress.flashcardMastery[cardId] || initializeCard(cardId, cards[currentIndex].difficulty);
      const updatedCardInfo = updateCardAfterReview(currentCardInfo, 'EASY');
      
      // Update context state directly
      setUserProgress(prev => ({
        ...prev,
        flashcardMastery: {
          ...prev.flashcardMastery,
          [cardId]: updatedCardInfo
        }
      }));
      
      // Add XP for mastering a card
      addXp(10);
    }
    
    // Move to next card
    setIsFlipped(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
    cardControls.set({ x: 0, rotate: 0 });
    setDirection(null);
  };
  
  // If no cards provided, show a message
  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-500">No flashcards available.</p>
      </div>
    );
  }
  
  const currentCard = cards[currentIndex];
  const currentCardSpacing = userProgress.flashcardMastery[currentCard?.id];
  
  // Function to determine mastery level color
  const getMasteryLevelColor = (level) => {
    if (!level && level !== 0) return 'bg-gray-200';
    
    const colors = [
      'bg-red-200 text-red-800', // Level 0
      'bg-orange-200 text-orange-800', // Level 1
      'bg-yellow-200 text-yellow-800', // Level 2
      'bg-lime-200 text-lime-800', // Level 3
      'bg-green-200 text-green-800', // Level 4
      'bg-emerald-200 text-emerald-800' // Level 5
    ];
    
    return colors[level] || colors[0];
  };
  
  // Get formatted next review date
  const getNextReviewText = (timestamp) => {
    if (!timestamp) return 'Not reviewed yet';
    
    // Check if timestamp needs parsing (useLocalStorage might store as string)
    const reviewDate = new Date(timestamp);
    if (isNaN(reviewDate.getTime())) { // Handle invalid date
      return 'Never reviewed';
    }
    
    const now = new Date();
    
    // If review date is in the past, show "Due now"
    if (reviewDate < now) {
      return 'Due now';
    }
    
    // Calculate time difference
    const diff = reviewDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return hours <= 1 ? 'Due in < 1 hour' : `Due in ${hours} hours`;
    } else if (days === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${days} days`;
    }
  };
  
  return (
    <div className="relative h-96 w-full max-w-md mx-auto mt-8" ref={dragConstraintsRef}>
      {/* Swipe indicators */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-red-500 font-bold text-xl opacity-50">
        <span className={`transition-opacity ${direction === 'left' ? 'opacity-100' : 'opacity-50'}`}>
          ← Needs Review
        </span>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-green-500 font-bold text-xl opacity-50">
        <span className={`transition-opacity ${direction === 'right' ? 'opacity-100' : 'opacity-50'}`}>
          Mastered →
        </span>
      </div>
      
      {/* Flashcard */}
      <motion.div
        className="absolute w-full h-full"
        animate={cardControls}
        drag="x"
        dragConstraints={dragConstraintsRef}
        onDragEnd={handleDragEnd}
        whileDrag={{
          cursor: 'grabbing',
        }}
        style={{
          perspective: '1000px'
        }}
      >
        <motion.div
          className="w-full h-full rounded-xl shadow-lg bg-white overflow-hidden cursor-grab"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleFlip}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Card front */}
          <motion.div
            className={`absolute w-full h-full p-8 flex flex-col items-center justify-center ${
              currentCard.category === 'arrays' ? 'bg-blue-50' :
              currentCard.category === 'linked-lists' ? 'bg-green-50' :
              currentCard.category === 'stacks' ? 'bg-yellow-50' :
              currentCard.category === 'queues' ? 'bg-red-50' :
              currentCard.category === 'trees' ? 'bg-teal-50' :
              currentCard.category === 'graphs' ? 'bg-purple-50' :
              'bg-gray-50'
            }`}
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-sm text-gray-500 mb-2 self-start flex justify-between w-full">
              <span>{currentCard.category}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${currentCard.difficulty === 'easy' ? 'bg-green-200 text-green-800' : 
                  currentCard.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' : 
                  'bg-red-200 text-red-800'}
              `}>
                {currentCard.difficulty}
              </span>
            </div>
            
            {/* Mastery level indicator */}
            {currentCardSpacing && (
              <div className="self-start w-full mb-4">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <span>Mastery Level: {currentCardSpacing.level}/5</span>
                  <span>{getNextReviewText(currentCardSpacing.nextReview)}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      currentCardSpacing.level === 0 ? 'bg-red-500' :
                      currentCardSpacing.level === 1 ? 'bg-orange-500' :
                      currentCardSpacing.level === 2 ? 'bg-yellow-500' :
                      currentCardSpacing.level === 3 ? 'bg-lime-500' :
                      currentCardSpacing.level === 4 ? 'bg-green-500' :
                      'bg-emerald-500'
                    }`} 
                    style={{ width: `${(currentCardSpacing.level / 5) * 100}%` }} 
                  />
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {currentCard.front}
            </h3>
            
            <p className="text-gray-600 text-center mt-auto">
              Tap to see answer
            </p>
            
            <div className="w-full flex justify-between mt-6 text-xs text-gray-400">
              <span>Card {currentIndex + 1} of {cards.length}</span>
              <span>Swipe to rate your recall</span>
            </div>
          </motion.div>
          
          {/* Card back */}
          <motion.div
            className={`absolute w-full h-full p-8 flex flex-col items-center justify-center ${
              currentCard.category === 'arrays' ? 'bg-blue-600 text-white' :
              currentCard.category === 'linked-lists' ? 'bg-green-600 text-white' :
              currentCard.category === 'stacks' ? 'bg-yellow-600 text-white' :
              currentCard.category === 'queues' ? 'bg-red-600 text-white' :
              currentCard.category === 'trees' ? 'bg-teal-600 text-white' :
              currentCard.category === 'graphs' ? 'bg-purple-600 text-white' :
              'bg-gray-600 text-white'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-sm opacity-80 mb-6 self-start">
              {currentCard.category} | {currentCard.difficulty}
            </div>
            
            <p className="text-lg font-medium mb-8 text-center">
              {currentCard.back}
            </p>
            
            <div className="mt-auto flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSwipeLeft();
                }}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors"
              >
                Needs Review
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSwipeRight();
                }}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
              >
                Mastered
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Visual feedback for swipe power */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-1 rounded-full bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(swipePower / 2, 100)}%` }}
        transition={{ duration: 0.2 }}
      ></motion.div>
    </div>
  );
};

export default FlashcardSwipe; 