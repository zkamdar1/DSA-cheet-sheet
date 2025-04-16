import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import ConceptCard from '../components/ConceptCard';
import CodePlayer from '../components/CodePlayer';
import QuizCard from '../components/QuizCard';
import FeynmanModal from '../components/FeynmanModal';
import ConfettiEffect from '../components/ConfettiEffect';
import conceptData from '../data/concepts.json';
import quizBank from '../data/quizBank.json';
import { traceBubbleSort, traceSelectionSort, traceInsertionSort } from '../utils/traceAlgorithm';

// Helper to get data for the current scene
const getSceneData = (sceneId) => {
  // Find category (assuming sceneId matches category id)
  const category = conceptData.categories.find(cat => cat.id === sceneId);
  if (!category) return { category: null, concepts: [], quizzes: [] };

  // Find quizzes for this topic (sceneId)
  const quizzes = quizBank.questions.filter(q => q.topic === sceneId);

  return {
    category,
    concepts: category.concepts || [],
    quizzes
  };
};

const SortingScene = () => {
  const { sceneId } = useParams();
  const { userProgress, markSceneInProgress, markSceneCompleted, addXp } = useUserProgress();

  // Load scene data based on sceneId
  const { category, concepts, quizzes } = useMemo(() => getSceneData(sceneId), [sceneId]);

  // Component State
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(concepts[0]?.id || 'bubble-sort');
  const [showFeynman, setShowFeynman] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // CodePlayer related state (might be managed within CodePlayer itself)
  const [initialArray, setInitialArray] = useState([]);

  // Generate random array
  const generateArray = () => {
    const size = 15;
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 5);
    setInitialArray(newArray);
  };

  // Initialize array and mark scene as in progress
  useEffect(() => {
    generateArray();
    if (sceneId && !userProgress.completedScenes.includes(sceneId)) {
      markSceneInProgress(sceneId);
    }
    // Check if scene was already completed
    if (userProgress.completedScenes.includes(sceneId)) {
        setIsCompleted(true);
        setQuizCompleted(true); // Assume quiz must be done to complete
    }
  }, [sceneId, markSceneInProgress, userProgress.completedScenes]);

  // Get concept data for the selected algorithm
  const currentConcept = useMemo(() => {
    return concepts.find(c => c.id === selectedAlgorithm);
  }, [concepts, selectedAlgorithm]);
  
  // Get quiz questions for the current scene (limit to e.g., 3)
  const sceneQuizzes = useMemo(() => {
    return quizzes.filter(q => q.difficulty === 'medium').slice(0, 3); // Example: 3 medium questions
  }, [quizzes]);

  // Handle quiz answer
  const handleQuizAnswer = (isCorrect, isNext) => {
    if (isCorrect && !isNext) {
        setCorrectAnswers(prev => prev + 1);
    }
    if (isNext && currentQuizIndex < sceneQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else if (isNext) {
      setQuizCompleted(true);
      // Check for scene completion
      // Example: complete if quiz is done
      if (!isCompleted) {
         markSceneCompleted(sceneId);
         addXp(50); // Award XP
         setIsCompleted(true);
         setShowConfetti(true);
      }
    }
  };

  // Determine which algorithm tracer to use
  const algorithmTracer = useMemo(() => {
      switch(selectedAlgorithm) {
          case 'selection-sort': return traceSelectionSort;
          case 'insertion-sort': return traceInsertionSort;
          case 'bubble-sort':
          default:
              return traceBubbleSort;
      }
  }, [selectedAlgorithm]);

  if (!category) {
    return <div className="p-8 text-center text-red-500">Error: Scene data not found for ID "{sceneId}".</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8 relative">
      <ConfettiEffect isActive={showConfetti} />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white rounded-t-xl shadow-lg">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 opacity-90">{category.description}</p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 mb-8">
          {/* Algorithm Selector */}
          <div className="mb-6">
            <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 mb-1">Select Algorithm:</label>
            <select
              id="algorithm"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              {concepts.map(concept => (
                <option key={concept.id} value={concept.id}>{concept.title}</option>
              ))}
            </select>
          </div>

          {/* Concept Card for Selected Algorithm */}
          {currentConcept && (
            <div className="mb-8">
               <ConceptCard concept={currentConcept} themeColor={category.color || 'indigo'} />
            </div>
          )}

          {/* Code Player Integration */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Code Visualization</h2>
             <button
                className="mb-2 px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                onClick={generateArray}
             >
                New Array
             </button>
            <CodePlayer
              key={selectedAlgorithm}
              algorithm={selectedAlgorithm}
              language={currentConcept?.language || 'javascript'}
              code={currentConcept?.code}
              tracer={algorithmTracer}
              initialArray={initialArray}
            />
          </div>

          {/* Quiz Section */}
          {sceneQuizzes.length > 0 && (
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Test Your Knowledge</h2>
              {!quizCompleted ? (
                 <QuizCard
                   key={currentQuizIndex}
                   question={sceneQuizzes[currentQuizIndex]}
                   onAnswer={handleQuizAnswer}
                 />
              ) : (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                    <p className="font-bold text-lg">Quiz Complete!</p>
                    <p>You answered {correctAnswers} out of {sceneQuizzes.length} correctly.</p>
                     {isCompleted && <p className="mt-2">Scene marked as complete! (+50 XP)</p>}
                </div>
              )}
            </div>
          )}

          {/* Feynman Button */}
          <div className="flex justify-center">
             <button
               className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow flex items-center hover:bg-purple-700 transition-colors"
               onClick={() => setShowFeynman(true)}
             >
               <span className="mr-2">🧠</span>
               Explain in Your Own Words
             </button>
          </div>

        </div>

         {/* Completion Indicator */}
         {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-green-500 text-white rounded-lg shadow-md text-center font-bold"
            >
               Scene Completed!
            </motion.div>
          )}

      </div>

      {/* Feynman modal */}
      <FeynmanModal
        isOpen={showFeynman}
        onClose={() => setShowFeynman(false)}
        topic={currentConcept?.title || category.name}
      />
    </div>
  );
};

export default SortingScene; 