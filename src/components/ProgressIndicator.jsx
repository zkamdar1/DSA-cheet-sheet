import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProgress } from '../context/UserProgressContext';
import { useTheme } from '../context/ThemeContext';

/**
 * ProgressIndicator - Displays user level, XP, and progress
 */
const ProgressIndicator = () => {
  const { userProgress } = useUserProgress();
  const { isDarkMode } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate progress to next level
  const xpForCurrentLevel = userProgress.level * 100 - 100;
  const xpForNextLevel = userProgress.level * 100;
  const currentLevelXp = userProgress.totalXp - xpForCurrentLevel;
  const xpToNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.min(100, (currentLevelXp / xpToNextLevel) * 100);
  
  // Get total scenes from completed + in progress
  const totalScenesAttempted = userProgress.completedScenes.length + userProgress.inProgressScenes.length;
  
  return (
    <div className="relative">
      <motion.button
        className={`flex items-center rounded-full ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-blue-100 hover:bg-blue-200'
        } px-3 py-1 transition-colors`}
        onClick={() => setShowDetails(!showDetails)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Star level icon */}
        <div className={`flex items-center justify-center h-6 w-6 rounded-full ${
          isDarkMode ? 'bg-purple-700 text-purple-100' : 'bg-purple-500 text-white'
        } mr-2`}>
          <span className="text-xs font-bold">{userProgress.level}</span>
        </div>
        
        {/* XP bar */}
        <div className={`h-2 w-24 rounded-full overflow-hidden ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15 
            }}
          />
        </div>
        
        {/* XP counter */}
        <div className={`ml-2 text-xs font-medium ${
          isDarkMode ? 'text-blue-300' : 'text-blue-600'
        }`}>
          {currentLevelXp}/{xpToNextLevel} XP
        </div>
      </motion.button>
      
      {/* Detailed progress panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className={`absolute right-0 top-full mt-2 p-4 rounded-lg shadow-lg w-64 z-10 ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-100 border border-gray-700' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h4 className="font-bold mb-3">Your Progress</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total XP</span>
                  <span className="font-medium">{userProgress.totalXp}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Level</span>
                  <span className="font-medium">{userProgress.level}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scenes Completed</span>
                  <span className="font-medium">{userProgress.completedScenes.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Scenes In Progress</span>
                  <span className="font-medium">{userProgress.inProgressScenes.length}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Feynman Explanations</span>
                  <span className="font-medium">{Object.keys(userProgress.feynmanExplanations).length}</span>
                </div>
              </div>
              
              {totalScenesAttempted > 0 && (
                <div className="pt-2">
                  <div className="text-sm mb-1">Scene Progress</div>
                  <div className="h-2 w-full rounded-full overflow-hidden bg-gray-700">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${(userProgress.completedScenes.length / totalScenesAttempted) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1 text-gray-400">
                    {Math.round((userProgress.completedScenes.length / totalScenesAttempted) * 100)}% Complete
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressIndicator; 