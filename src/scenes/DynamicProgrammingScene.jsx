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
// Assume tracers exist
import { traceKnapsack, traceLCS } from '../utils/traceAlgorithm'; // Placeholder

// Helper (assuming it's defined elsewhere or here)
const getSceneData = (sceneId) => {
  const category = conceptData.categories.find(cat => cat.id === sceneId);
  if (!category) return { category: null, concepts: [], quizzes: [] };
  const quizzes = quizBank.questions.filter(q => q.topic === sceneId);
  return { category, concepts: category.concepts || [], quizzes };
};

const DynamicProgrammingScene = () => {
  const { sceneId = 'dynamic-programming' } = useParams();
  const { userProgress, markSceneInProgress, markSceneCompleted, addXp } = useUserProgress();

  const { category, concepts, quizzes } = useMemo(() => getSceneData(sceneId), [sceneId]);

  // State
  const [selectedConceptId, setSelectedConceptId] = useState(concepts[0]?.id || 'memoization');
  const [showFeynman, setShowFeynman] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  // Example input for DP problems (might vary based on concept)
  const [dpInput, setDpInput] = useState({ capacity: 10, items: [{ weight: 2, value: 6 }, { weight: 2, value: 10 }, { weight: 3, value: 12 }] });

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

  const currentConcept = useMemo(() => concepts.find(c => c.id === selectedConceptId), [concepts, selectedConceptId]);
  const sceneQuizzes = useMemo(() => quizzes.filter(q => q.difficulty === 'medium').slice(0, 3), [quizzes]);

  const handleQuizAnswer = (isCorrect, isNext) => {
    if (isCorrect && !isNext) setCorrectAnswers(prev => prev + 1);
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

  // Placeholder tracer logic
  const dpTracer = useMemo(() => {
      // Determine tracer based on selected concept (e.g., Knapsack or LCS)
      if (selectedConceptId === 'knapsack-problem') { // Example mapping
          return traceKnapsack;
      } else if (selectedConceptId === 'longest-common-subsequence') {
          return traceLCS;
      } else {
          // Fallback for memoization/tabulation concepts (might not have visual trace)
          return (input) => {
              console.warn("Tracer not implemented for DP concept:", selectedConceptId);
              const tracer = createArrayTracer(); // Use generic tracer or specialized DP tracer
              tracer.init([]);
              tracer.step("Tracing DP...");
              tracer.end("Trace complete.");
              return tracer;
          }
      }
  }, [selectedConceptId]);

  if (!category) return <div className="p-8 text-center text-red-500">Error: Scene data not found for ID "{sceneId}".</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-yellow-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-white rounded-t-xl shadow-lg">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 opacity-90">{category.description}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 mb-8">
          {/* Concept Selector */}
          {concepts.length > 1 && (
              <div className="mb-6">
                <label htmlFor="concept" className="block text-sm font-medium text-gray-700 mb-1">Select Concept:</label>
                <select id="concept" value={selectedConceptId} onChange={(e) => setSelectedConceptId(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    {concepts.map(c => <option key={c.id} value={c.id}>{c.title}</option>)} 
                </select>
              </div>
          )}

          {/* Concept Card */}
          {currentConcept && (
              <div className="mb-8">
                  <ConceptCard concept={currentConcept} themeColor={category.color || 'yellow'} />
              </div>
          )}

          {/* Code Player */}
          {currentConcept?.code && (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Code Visualization</h2>
                 {/* TODO: Add input controls specific to the selected DP problem */}
                <CodePlayer
                    key={selectedConceptId}
                    algorithm={selectedConceptId}
                    language={currentConcept.language || 'javascript'}
                    code={currentConcept.code}
                    tracer={() => dpTracer(dpInput)} // Pass tracer with DP input data
                    initialArray={[]} // DP might use different visualizations (e.g., tables)
                />
            </div>
          )}

          {/* Quiz Section */}
          {sceneQuizzes.length > 0 && (
              <div className="mb-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Test Your Knowledge</h2>
                  {!quizCompleted ? (
                      <QuizCard key={currentQuizIndex} question={sceneQuizzes[currentQuizIndex]} onAnswer={handleQuizAnswer} />
                  ) : (
                      <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                          <p className="font-bold text-lg">Quiz Complete! {correctAnswers}/{sceneQuizzes.length}</p>
                           {isCompleted && <p className="mt-2">Scene marked as complete! (+50 XP)</p>}
                      </div>
                  )}
              </div>
          )}

          {/* Feynman Button */}
          <div className="flex justify-center">
             <button onClick={() => setShowFeynman(true)} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg shadow flex items-center hover:bg-yellow-700 transition-colors">
               <span className="mr-2">🧠</span> Explain in Your Own Words
             </button>
          </div>
        </div>

        {/* Completion Indicator */}
         {isCompleted && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-green-500 text-white rounded-lg shadow-md text-center font-bold">
               Scene Completed!
            </motion.div>
          )}
      </div>

      {/* Feynman modal */}
      <FeynmanModal isOpen={showFeynman} onClose={() => setShowFeynman(false)} topic={currentConcept?.title || category.name} />
    </div>
  );
};

// Placeholder for required tracer creator if not in traceAlgorithm.js
const createArrayTracer = () => ({ init: () => {}, step: () => {}, end: () => {}, getSteps: () => [] });

export default DynamicProgrammingScene; 