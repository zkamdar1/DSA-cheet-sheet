import { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';

// Initial progress structure
const initialProgress = {
  completedScenes: [],
  inProgressScenes: [],
  flashcardMastery: {}, // format: { cardId: { level: number, interval: number, lastReviewed: Date, nextReview: Date, reviewCount: number, difficulty: string } }
  quizScores: {}, // format: { sceneId: { score: number, totalQuestions: number } }
  feynmanExplanations: {}, // format: { topicId: string }
  totalXp: 0,
  level: 1
};

// Create context
export const UserProgressContext = createContext({
  userProgress: initialProgress,
  markSceneCompleted: () => {},
  markSceneInProgress: () => {},
  saveQuizScore: () => {},
  saveFeynmanExplanation: () => {},
  addXp: () => {},
  resetProgress: () => {},
  setUserProgress: () => {}, // Expose the raw setter from useLocalStorage
});

// Get user's level based on XP
const calculateLevel = (xp) => {
  // Simple level calculation: level = 1 + floor(xp/100)
  return 1 + Math.floor(xp / 100);
};

// Provider component
export const UserProgressProvider = ({ children }) => {
  // Use localStorage to persist user progress
  const [userProgress, setUserProgress] = useLocalStorage('dsa-user-progress', initialProgress);

  // Update level when XP changes
  useEffect(() => {
    const newLevel = calculateLevel(userProgress.totalXp);
    if (newLevel !== userProgress.level) {
      setUserProgress(prev => ({ ...prev, level: newLevel }));
    }
  }, [userProgress.totalXp, userProgress.level, setUserProgress]);

  // Mark a scene as completed
  const markSceneCompleted = (sceneId) => {
    setUserProgress(prev => {
      // If scene is already completed, don't modify
      if (prev.completedScenes.includes(sceneId)) {
        return prev;
      }
      
      // Remove from inProgress if it's there
      const updatedInProgress = prev.inProgressScenes.filter(id => id !== sceneId);
      
      // Add to completed scenes
      return {
        ...prev,
        completedScenes: [...prev.completedScenes, sceneId],
        inProgressScenes: updatedInProgress
      };
    });
  };

  // Mark a scene as in progress
  const markSceneInProgress = (sceneId) => {
    setUserProgress(prev => {
      // If scene is already in progress or completed, don't modify
      if (prev.inProgressScenes.includes(sceneId) || prev.completedScenes.includes(sceneId)) {
        return prev;
      }
      
      return {
        ...prev,
        inProgressScenes: [...prev.inProgressScenes, sceneId]
      };
    });
  };

  // Save quiz score
  const saveQuizScore = (quizId, score, totalQuestions) => {
    setUserProgress(prev => {
      const currentBestScore = prev.quizScores[quizId]?.score || 0;
      
      // Only update if new score is higher
      if (score > currentBestScore) {
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [quizId]: { score, totalQuestions }
          }
        };
      }
      return prev;
    });
  };

  // Save Feynman explanation
  const saveFeynmanExplanation = (topicId, explanation) => {
    setUserProgress(prev => ({
      ...prev,
      feynmanExplanations: {
        ...prev.feynmanExplanations,
        [topicId]: explanation
      }
    }));
  };

  // Add experience points
  const addXp = (amount) => {
    setUserProgress(prev => ({
      ...prev,
      totalXp: prev.totalXp + amount
    }));
  };

  // Reset all progress
  const resetProgress = () => {
    setUserProgress(initialProgress);
  };

  return (
    <UserProgressContext.Provider 
      value={{ 
        userProgress, 
        markSceneCompleted, 
        markSceneInProgress,
        saveQuizScore,
        saveFeynmanExplanation,
        addXp,
        resetProgress,
        setUserProgress
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

// Custom hook for using the user progress context
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

export default UserProgressProvider; 