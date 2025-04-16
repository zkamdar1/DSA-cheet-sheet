import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptCard from '../components/ConceptCard';
import CodePlayer from '../components/CodePlayer';
import FeynmanModal from '../components/FeynmanModal';

const LearningCapsule = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [conceptIndex, setConceptIndex] = useState(0);
  const [showFeynmanModal, setShowFeynmanModal] = useState(false);
  const [activeTab, setActiveTab] = useState('concept');
  
  // Load topic data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be a fetch call to an API
        // For now, we'll import the data directly
        const data = await import('../data/concepts.json');
        
        // Find the category that matches the topicId
        const category = data.categories.find(cat => cat.id === topicId);
        
        if (category) {
          setCategoryData(category);
        } else {
          console.error(`Category with ID ${topicId} not found`);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading category data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [topicId]);
  
  const handleNextConcept = () => {
    if (conceptIndex < categoryData.concepts.length - 1) {
      setConceptIndex(conceptIndex + 1);
    }
  };
  
  const handlePrevConcept = () => {
    if (conceptIndex > 0) {
      setConceptIndex(conceptIndex - 1);
    }
  };
  
  const handleFeynmanClick = () => {
    setShowFeynmanModal(true);
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleBackToGalaxy = () => {
    navigate('/');
  };
  
  // Choose an algorithm based on the topic
  const getAlgorithmForTopic = () => {
    switch (topicId) {
      case 'arrays':
        return 'bubble-sort';
      case 'binary-search-trees':
      case 'searching':
        return 'binary-search';
      // Could add more mappings here
      default:
        return 'bubble-sort'; // Default for now
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }
  
  // If category not found
  if (!categoryData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl text-red-600 mb-4">Topic Not Found</h2>
          <p className="text-gray-700 mb-6">
            Sorry, we couldn't find the topic you're looking for. It may have been moved or deleted.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={handleBackToGalaxy}
          >
            Back to Galaxy
          </button>
        </div>
      </div>
    );
  }
  
  const currentConcept = categoryData.concepts[conceptIndex];
  
  // Map color name to Tailwind color class and CSS color
  const getColorForCategory = () => {
    const colorMap = {
      blue: { tailwind: 'blue', css: '#3B82F6' },
      green: { tailwind: 'green', css: '#10B981' },
      purple: { tailwind: 'purple', css: '#8B5CF6' },
      orange: { tailwind: 'orange', css: '#F59E0B' },
      red: { tailwind: 'red', css: '#EF4444' },
      teal: { tailwind: 'teal', css: '#14B8A6' },
      yellow: { tailwind: 'yellow', css: '#F59E0B' },
      pink: { tailwind: 'pink', css: '#EC4899' }
    };
    
    return colorMap[categoryData.color] || colorMap.blue;
  };
  
  const categoryColor = getColorForCategory();
  
  return (
    <div className={`min-h-screen bg-${categoryColor.tailwind}-50 pb-20`}>
      {/* Header */}
      <div 
        className={`bg-${categoryColor.tailwind}-600 text-white py-4 px-6 shadow-md`}
        style={{ 
          background: `linear-gradient(135deg, ${categoryColor.css}, ${categoryColor.css}dd)` 
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <button 
                className="flex items-center text-white mb-2 md:mb-0 hover:text-blue-100 transition-colors"
                onClick={handleBackToGalaxy}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Galaxy
              </button>
              <h1 className="text-3xl font-bold mt-2">{categoryData.name}</h1>
              <p className="text-white text-opacity-90 mt-1">{categoryData.description}</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                className={`px-4 py-2 rounded-lg border border-white ${
                  showFeynmanModal ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:bg-opacity-10'
                } transition-colors`}
                onClick={handleFeynmanClick}
              >
                <span className="flex items-center">
                  <span className="mr-1 text-lg">🧠</span>
                  Feynman Box
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'concept'
                ? `text-${categoryColor.tailwind}-700 border-b-2 border-${categoryColor.tailwind}-500`
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('concept')}
          >
            Core Concepts
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'code'
                ? `text-${categoryColor.tailwind}-700 border-b-2 border-${categoryColor.tailwind}-500`
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('code')}
          >
            Code Playground
          </button>
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'concept' ? (
            <motion.div
              key="concept-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Key Concepts</h2>
                <div className="flex items-center space-x-2">
                  <button
                    className={`p-2 rounded-full ${
                      conceptIndex === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : `text-${categoryColor.tailwind}-600 hover:bg-${categoryColor.tailwind}-100`
                    }`}
                    onClick={handlePrevConcept}
                    disabled={conceptIndex === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-gray-600">
                    {conceptIndex + 1} of {categoryData.concepts.length}
                  </span>
                  <button
                    className={`p-2 rounded-full ${
                      conceptIndex === categoryData.concepts.length - 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : `text-${categoryColor.tailwind}-600 hover:bg-${categoryColor.tailwind}-100`
                    }`}
                    onClick={handleNextConcept}
                    disabled={conceptIndex === categoryData.concepts.length - 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Concept card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentConcept.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <ConceptCard concept={currentConcept} themeColor={categoryData.color} />
                </motion.div>
              </AnimatePresence>
              
              {/* Quick navigation dots */}
              <div className="flex justify-center mt-6 space-x-1">
                {categoryData.concepts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === conceptIndex
                        ? `bg-${categoryColor.tailwind}-600`
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setConceptIndex(index)}
                    aria-label={`Go to concept ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Practice suggestions */}
              <div className={`mt-12 p-6 bg-${categoryColor.tailwind}-100 rounded-lg shadow-sm`}>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Practice Suggestions</h3>
                <p className={`text-${categoryColor.tailwind}-800 mb-4`}>
                  Try these LeetCode problems to apply what you've learned:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 border border-${categoryColor.tailwind}-200 rounded-lg bg-white`}>
                    <div className="flex items-center">
                      <span className={`inline-block w-8 h-8 rounded-full bg-${categoryColor.tailwind}-200 text-${categoryColor.tailwind}-700 flex items-center justify-center font-bold mr-2`}>E</span>
                      <span className="font-medium">Easy Problem</span>
                    </div>
                    <p className="mt-2 text-gray-600">Two Sum (Problem #1)</p>
                  </div>
                  <div className={`p-4 border border-${categoryColor.tailwind}-200 rounded-lg bg-white`}>
                    <div className="flex items-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-yellow-200 text-yellow-700 flex items-center justify-center font-bold mr-2">M</span>
                      <span className="font-medium">Medium Problem</span>
                    </div>
                    <p className="mt-2 text-gray-600">3Sum (Problem #15)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Code Playground</h2>
                <p className="text-gray-600">
                  Watch the algorithm in action and understand how it works step by step.
                </p>
              </div>
              
              <CodePlayer algorithm={getAlgorithmForTopic()} />
              
              <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Time complexity is an important consideration for algorithm selection</li>
                  <li>Watch for edge cases like empty arrays or single element arrays</li>
                  <li>Consider whether the input is sorted or has special properties</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Feynman Modal */}
      <FeynmanModal 
        isOpen={showFeynmanModal} 
        onClose={() => setShowFeynmanModal(false)} 
        topic={categoryData.name} 
      />
    </div>
  );
};

export default LearningCapsule; 