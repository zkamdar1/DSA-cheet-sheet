import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import ConceptCard from '../components/ConceptCard';
import CodePlayer from '../components/CodePlayer';
import QuizCard from '../components/QuizCard';
import FeynmanModal from '../components/FeynmanModal';
import conceptData from '../data/concepts.json';
import quizBank from '../data/quizBank.json';
// Assume a tracer exists, e.g., traceFibonacci
import { traceFibonacci } from '../utils/traceAlgorithm'; // Placeholder

// Helper to get data for the current scene (can be reused or moved to a shared util)
const getSceneData = (sceneId) => {
  const category = conceptData.categories.find(cat => cat.id === sceneId);
  if (!category) return { category: null, concepts: [], quizzes: [] };
  const quizzes = quizBank.questions.filter(q => q.topic === sceneId);
  return {
    category,
    concepts: category.concepts || [],
    quizzes
  };
};

const RecursionScene = () => {
  const { sceneId = 'recursion' } = useParams(); // Default to 'recursion' if no param
  const { userProgress, markSceneInProgress, markSceneCompleted, addXp } = useUserProgress();

  const { category, concepts, quizzes } = useMemo(() => getSceneData(sceneId), [sceneId]);

  // State
  const [selectedConceptId, setSelectedConceptId] = useState(concepts[0]?.id || null);
  const [showFeynman, setShowFeynman] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [initialInput, setInitialInput] = useState(5); // Example input for Fibonacci

  // Mark scene as in progress
  useEffect(() => {
    if (sceneId && !userProgress.completedScenes.includes(sceneId)) {
      markSceneInProgress(sceneId);
    }
    if (userProgress.completedScenes.includes(sceneId)) {
        setIsCompleted(true);
        setQuizCompleted(true);
    }
  }, [sceneId, markSceneInProgress, userProgress.completedScenes]);

  // Get current concept and quizzes
  const currentConcept = useMemo(() => {
    return concepts.find(c => c.id === selectedConceptId);
  }, [concepts, selectedConceptId]);

  const sceneQuizzes = useMemo(() => {
    return quizzes.filter(q => q.difficulty === 'medium').slice(0, 3);
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
      if (!isCompleted) {
         markSceneCompleted(sceneId);
         addXp(50);
         setIsCompleted(true);
      }
    }
  };
  
  // Placeholder tracer - replace with actual tracer logic
  const recursionTracer = (input) => {
      // This should call the actual traceFibonacci or similar
      console.warn("Using placeholder tracer for recursion");
      // Example: Return mock steps if traceFibonacci isn't implemented
      const tracer = createArrayTracer(); // Needs appropriate tracer type
      tracer.init([input]);
      tracer.step(`Calculating fib(${input})...`);
      // ... add more mock steps ...
      tracer.end(`Result for fib(${input})`);
      return tracer;
  };

  if (!category) {
    return <div className="p-8 text-center text-red-500">Error: Scene data not found for ID "{sceneId}".</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-xl shadow-lg">
          <h1 className="text-3xl font-bold">{category.name}</h1>
           <p className="mt-2 opacity-90">{category.description}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 mb-8">
          {/* Concept Selector (if multiple concepts) */}
          {concepts.length > 1 && (
            <div className="mb-6">
              <label htmlFor="concept" className="block text-sm font-medium text-gray-700 mb-1">Select Concept:</label>
              <select
                id="concept"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedConceptId}
                onChange={(e) => setSelectedConceptId(e.target.value)}
              >
                {concepts.map(concept => (
                  <option key={concept.id} value={concept.id}>{concept.title}</option>
                ))}
              </select>
            </div>
          )}

          {/* Concept Card */}
          {currentConcept && (
            <div className="mb-8">
              <ConceptCard concept={currentConcept} themeColor={category.color || 'indigo'} />
            </div>
          )}

          {/* Code Player */}
          {currentConcept?.code && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Code Visualization</h2>
              {/* Input specific to recursion example */}
              <div className="mb-2">
                 <label htmlFor="fibInput" className="mr-2">Input (e.g., Fibonacci):</label>
                 <input 
                   type="number" 
                   id="fibInput" 
                   value={initialInput} 
                   onChange={(e) => setInitialInput(Number(e.target.value) || 0)}
                   className="border rounded px-2 py-1 w-16"
                   min="0" max="10" // Limit for performance
                 />
              </div>
              <CodePlayer
                key={selectedConceptId + initialInput} // Re-render if concept or input changes
                algorithm={selectedConceptId}
                language={currentConcept.language || 'javascript'}
                code={currentConcept.code}
                tracer={() => recursionTracer(initialInput)} // Pass tracer function that uses current input
                initialArray={[initialInput]} // Pass input as array for tracer compatibility
              />
            </div>
          )}

          {/* Quiz Section */}
          {sceneQuizzes.length > 0 && (
            <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
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
               className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow flex items-center hover:bg-purple-700 transition-colors"
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

// Need to implement createArrayTracer in traceAlgorithm.js if not already present
const createArrayTracer = () => ({ init: () => {}, step: () => {}, end: () => {}, getSteps: () => [] });

export default RecursionScene; 