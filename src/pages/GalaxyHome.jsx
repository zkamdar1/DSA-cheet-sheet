import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VisualNavMap from '../components/VisualNavMap';

const GalaxyHome = () => {
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showScenePanel, setShowScenePanel] = useState(false);

  // Load galaxy map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        // In a real app, this would be a fetch call to an API
        // For now, we'll import the data directly
        const data = await import('../data/visualMap.json');
        setMapData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading map data:', error);
        setIsLoading(false);
      }
    };

    loadMapData();
    
    // Check if the user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenDSAIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);
  
  const handleCloseIntro = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenDSAIntro', 'true');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl text-white">Loading DSA Galaxy...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-gray-900">
      {/* Main galaxy map */}
      <VisualNavMap mapData={mapData} />
      
      {/* Title overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          DSA Galaxy Explorer
        </motion.h1>
        
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/flashcards" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors">
            Flashcards
          </Link>
          <Link to="/quiz" className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors">
            Quiz Arena
          </Link>
          <Link to="/playground" className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors">
            Playground
          </Link>
          <button 
            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-sm transition-colors"
            onClick={() => setShowScenePanel(!showScenePanel)}
          >
            Interactive Scenes
          </button>
        </motion.div>
      </div>
      
      {/* Scene selection panel */}
      {showScenePanel && (
        <motion.div 
          className="absolute right-4 top-16 z-20 bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 w-64"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="text-white font-bold mb-3 flex items-center">
            <span className="mr-2">✨</span>
            Interactive Learning
          </h3>
          
          <div className="space-y-2">
            <Link 
              to="/scene/recursion" 
              className="block p-3 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm">🔄</span>
                </div>
                <div>
                  <div className="font-medium">Recursion</div>
                  <div className="text-xs text-indigo-300">Self-referential magic</div>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/scene/graphs" 
              className="block p-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm">🕸️</span>
                </div>
                <div>
                  <div className="font-medium">Graphs</div>
                  <div className="text-xs text-blue-300">Networks & connections</div>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/scene/sorting" 
              className="block p-3 rounded-lg bg-purple-900 hover:bg-purple-800 text-white transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm">📊</span>
                </div>
                <div>
                  <div className="font-medium">Sorting</div>
                  <div className="text-xs text-purple-300">Bringing order to chaos</div>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-3 text-xs text-gray-400 italic">
            Fully interactive, immersive learning experiences
          </div>
        </motion.div>
      )}
      
      {/* Introduction overlay - shown only first time */}
      {showIntro && (
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-80 z-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-gray-800 rounded-xl p-8 max-w-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', damping: 25 }}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={handleCloseIntro}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to DSA Galaxy!</h2>
            
            <p className="text-blue-200 mb-6">
              Explore the universe of Data Structures and Algorithms. This interactive map shows the connections between different concepts.
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-white font-bold mb-2">How to use:</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-blue-500 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 text-xs text-white">1</span>
                  <span>Click and drag to pan around the galaxy</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-blue-500 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 text-xs text-white">2</span>
                  <span>Use mouse wheel to zoom in/out</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-blue-500 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 text-xs text-white">3</span>
                  <span>Click on any node to explore that topic</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-900 p-4 rounded-lg mb-6">
              <h3 className="text-white font-bold mb-2">✨ New: Interactive Scenes</h3>
              <p className="text-indigo-200 mb-2">
                Try our new immersive learning experiences with interactive visualizations.
              </p>
              <div className="flex justify-between">
                <Link to="/scene/recursion" className="text-indigo-300 hover:text-white transition-colors">Recursion</Link>
                <Link to="/scene/graphs" className="text-indigo-300 hover:text-white transition-colors">Graphs</Link>
                <Link to="/scene/sorting" className="text-indigo-300 hover:text-white transition-colors">Sorting</Link>
              </div>
            </div>
            
            <button 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
              onClick={handleCloseIntro}
            >
              Start Exploring
            </button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Bottom navigation tabs */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center z-10">
        <motion.div 
          className="bg-gray-800 bg-opacity-80 rounded-full px-6 py-3 flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/" className="text-white opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <span className="text-lg">🌌</span>
              <span className="text-xs mt-1">Galaxy</span>
            </div>
          </Link>
          <Link to="/flashcards" className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <span className="text-lg">🃏</span>
              <span className="text-xs mt-1">Flashcards</span>
            </div>
          </Link>
          <Link to="/quiz" className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <span className="text-lg">❓</span>
              <span className="text-xs mt-1">Quiz</span>
            </div>
          </Link>
          <Link to="/playground" className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <span className="text-lg">🧪</span>
              <span className="text-xs mt-1">Playground</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GalaxyHome; 