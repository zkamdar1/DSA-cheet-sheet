import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlashcardSwipe from '../components/FlashcardSwipe';

const FlashcardDeck = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [categories, setCategories] = useState([]);

  // Load flashcards data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be a fetch call to an API
        // For now, we'll import the data directly
        const data = await import('../data/flashcards.json');
        setCards(data.cards);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.cards.map(card => card.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading flashcards:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filter cards based on active filters
  const filteredCards = cards.filter(card => {
    const categoryMatch = activeCategory === 'all' || card.category === activeCategory;
    const difficultyMatch = activeDifficulty === 'all' || card.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleDifficultyChange = (difficulty) => {
    setActiveDifficulty(difficulty);
  };
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl text-gray-700">Loading flashcards...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <button 
                className="flex items-center text-white mb-2 md:mb-0 hover:text-blue-100 transition-colors"
                onClick={handleBackClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Galaxy
              </button>
              <h1 className="text-3xl font-bold mt-2">Flashcard Deck</h1>
              <p className="text-white text-opacity-90 mt-1">
                Test your knowledge with spaced repetition
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded-lg text-sm">
                {filteredCards.length} cards available
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Filter Cards</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === 'all' 
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All Topics
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category 
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Difficulty</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeDifficulty === 'all' 
                      ? 'bg-gray-800 text-white font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleDifficultyChange('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeDifficulty === 'easy' 
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleDifficultyChange('easy')}
                >
                  Easy
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeDifficulty === 'medium' 
                      ? 'bg-yellow-100 text-yellow-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleDifficultyChange('medium')}
                >
                  Medium
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeDifficulty === 'hard' 
                      ? 'bg-red-100 text-red-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleDifficultyChange('hard')}
                >
                  Hard
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Flashcards */}
        {filteredCards.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FlashcardSwipe cards={filteredCards} />
            
            <div className="mt-8 text-center text-gray-600">
              <p>Swipe right if you've mastered the card, or left if you need to review it again.</p>
              <p className="mt-2 text-sm">Your progress is saved automatically using spaced repetition.</p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 6a9.97 9.97 0 0110 10v1a1 1 0 01-1 1h-1M12 6a9.97 9.97 0 00-10 10v1a1 1 0 001 1h1" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No cards match your filters</h3>
            <p className="text-gray-600 mb-6">Try selecting different filters or categories</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                setActiveCategory('all');
                setActiveDifficulty('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardDeck; 