import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserProgress } from '../context/UserProgressContext';
import { useTheme } from '../context/ThemeContext';

// Define the journey structure
const journeyPath = [
  {
    id: 'arrays',
    title: 'Arrays & Lists',
    description: 'Begin with the basic building blocks of all data structures',
    icon: '📋',
    color: 'blue',
    scenes: [
      { id: 'recursion', title: 'Recursion', description: 'Master the art of self-reference', emoji: '🔄' },
    ]
  },
  {
    id: 'searching',
    title: 'Searching & Sorting',
    description: 'Learn how to find and organize data efficiently',
    icon: '🔍',
    color: 'purple',
    scenes: [
      { id: 'sorting', title: 'Sorting Algorithms', description: 'Bring order to chaos with efficient sorting', emoji: '📊' },
      { id: 'binary-search-tree', title: 'Binary Search Trees', description: 'Efficient data lookup and organization', emoji: '🌲' },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Structures',
    description: 'Explore complex relationships between data',
    icon: '🕸️',
    color: 'green',
    scenes: [
      { id: 'graphs', title: 'Graph Algorithms', description: 'Navigate connections and relationships', emoji: '🌐' },
      { id: 'dynamic-programming', title: 'Dynamic Programming', description: 'Solve complex problems with optimization', emoji: '��' },
    ]
  }
];

const JourneyMode = () => {
  const { userProgress } = useUserProgress();
  const { isDarkMode } = useTheme();
  
  // Function to check if a scene is unlocked
  const isSceneUnlocked = (sceneIndex, pathIndex) => {
    // First scene is always unlocked
    if (pathIndex === 0 && sceneIndex === 0) return true;
    
    // Get the previous scene
    let prevScene = null;
    if (sceneIndex > 0) {
      // Previous scene in the same path
      prevScene = journeyPath[pathIndex].scenes[sceneIndex - 1].id;
    } else if (pathIndex > 0) {
      // Last scene of the previous path
      const prevPath = journeyPath[pathIndex - 1];
      prevScene = prevPath.scenes[prevPath.scenes.length - 1].id;
    }
    
    // If previous scene is completed, this scene is unlocked
    return prevScene && userProgress.completedScenes.includes(prevScene);
  };
  
  // Function to get scene status
  const getSceneStatus = (sceneId) => {
    if (userProgress.completedScenes.includes(sceneId)) {
      return 'completed';
    }
    if (userProgress.inProgressScenes.includes(sceneId)) {
      return 'in-progress';
    }
    return 'locked';
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} py-12 px-4`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            DSA Learning Journey
          </motion.h1>
          <motion.p 
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Follow this guided path to master Data Structures & Algorithms one step at a time. 
            Complete each scene to unlock the next one.
          </motion.p>
        </div>
        
        <div className="space-y-12">
          {journeyPath.map((path, pathIndex) => (
            <div key={path.id} className="relative">
              {/* Title section */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-${path.color}-600 flex items-center justify-center text-2xl shrink-0`}>
                  {path.icon}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{path.title}</h2>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{path.description}</p>
                </div>
              </div>
              
              {/* Scene path */}
              <div className="ml-6 pl-12 border-l-2 border-dashed border-gray-500">
                {path.scenes.map((scene, sceneIndex) => {
                  const status = getSceneStatus(scene.id);
                  const unlocked = isSceneUnlocked(sceneIndex, pathIndex);
                  
                  return (
                    <motion.div 
                      key={scene.id}
                      className="mb-8 relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (pathIndex + sceneIndex) }}
                    >
                      {/* Node point on the path */}
                      <div 
                        className={`absolute left-0 top-6 w-6 h-6 rounded-full -ml-15 ${
                          status === 'completed' 
                            ? 'bg-green-500' 
                            : status === 'in-progress' 
                              ? 'bg-yellow-500' 
                              : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                        } transform -translate-x-1/2`}
                      >
                        {status === 'completed' && (
                          <svg className="w-4 h-4 mx-auto my-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Scene card */}
                      <div 
                        className={`p-5 rounded-lg shadow-lg ${
                          unlocked 
                            ? isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50' 
                            : isDarkMode ? 'bg-gray-800 opacity-50' : 'bg-gray-100 opacity-70'
                        } transition-colors`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                              unlocked ? `bg-${path.color}-100 text-${path.color}-800` : 'bg-gray-200 text-gray-500'
                            }`}>
                              {scene.emoji}
                            </div>
                            <div className="ml-3">
                              <h3 className="font-bold text-lg">{scene.title}</h3>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{scene.description}</p>
                            </div>
                          </div>
                          
                          {unlocked ? (
                            <Link 
                              to={`/scene/${scene.id}`} 
                              className={`px-4 py-2 rounded-lg ${
                                status === 'completed' 
                                  ? isDarkMode ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800 border border-green-200'
                                  : `bg-${path.color}-600 text-white hover:bg-${path.color}-700`
                              } transition-colors`}
                            >
                              {status === 'completed' 
                                ? 'Revisit' 
                                : status === 'in-progress' 
                                  ? 'Continue' 
                                  : 'Start'}
                            </Link>
                          ) : (
                            <div className="px-4 py-2 rounded-lg bg-gray-600 text-gray-300 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Locked
                            </div>
                          )}
                        </div>
                        
                        {/* Progress indicator for in-progress scenes */}
                        {status === 'in-progress' && (
                          <div className="mt-3">
                            <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                              {/* Mock progress - in a real app this would be tracked */}
                              <div className="h-full bg-yellow-500" style={{ width: '30%' }} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">30% Complete</p>
                          </div>
                        )}
                        
                        {/* XP reward indicator */}
                        {unlocked && (
                          <div className={`mt-3 text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                            Reward: +50 XP {status === 'completed' && '(claimed)'}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className={`inline-flex items-center px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Galaxy Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JourneyMode; 