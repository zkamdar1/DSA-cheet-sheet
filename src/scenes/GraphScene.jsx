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
import { traceBFS, traceDFS } from '../utils/traceAlgorithm'; // Placeholder

// Helper (assuming it's defined elsewhere or here)
const getSceneData = (sceneId) => {
  const category = conceptData.categories.find(cat => cat.id === sceneId);
  if (!category) return { category: null, concepts: [], quizzes: [] };
  const quizzes = quizBank.questions.filter(q => q.topic === sceneId);
  return { category, concepts: category.concepts || [], quizzes };
};

const GraphScene = () => {
  const { sceneId = 'graphs' } = useParams();
  const { userProgress, markSceneInProgress, markSceneCompleted, addXp } = useUserProgress();

  const { category, concepts, quizzes } = useMemo(() => getSceneData(sceneId), [sceneId]);

  // State
  const [selectedConceptId, setSelectedConceptId] = useState(concepts[0]?.id || 'graph-traversal');
  const [showFeynman, setShowFeynman] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  // Example graph data for visualization (could be loaded from concept data)
  const [graphData, setGraphData] = useState({
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
    edges: [{ source: 'A', target: 'B' }, { source: 'A', target: 'C' }, { source: 'B', target: 'D' }, { source: 'C', target: 'E' }]
  });

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
  const graphTracer = useMemo(() => {
      // Determine tracer based on selected concept (e.g., BFS or DFS)
      // This needs refinement based on how concepts map to algorithms
      if (selectedConceptId === 'graph-traversal') { // Example mapping
          return traceBFS; // Defaulting to BFS tracer for now
      } else {
          // Fallback or specific tracer for other graph concepts
          return (graph) => {
              console.warn("Using placeholder tracer for graph concept:", selectedConceptId);
              const tracer = createGraphTracer(); // Requires createGraphTracer
              tracer.init(graph.nodes, graph.edges);
              tracer.step("Tracing...");
              tracer.end("Trace complete.");
              return tracer;
          }
      }
  }, [selectedConceptId]);

  if (!category) return <div className="p-8 text-center text-red-500">Error: Scene data not found for ID "{sceneId}".</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white rounded-t-xl shadow-lg">
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
                  <ConceptCard concept={currentConcept} themeColor={category.color || 'teal'} />
              </div>
          )}

          {/* Code Player */}
          {currentConcept?.code && (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Code Visualization</h2>
                {/* Add controls if needed for graph input */}
                <CodePlayer
                    key={selectedConceptId}
                    algorithm={selectedConceptId}
                    language={currentConcept.language || 'javascript'}
                    code={currentConcept.code}
                    tracer={() => graphTracer(graphData)} // Pass tracer with graph data
                    initialArray={[]} // Graphs don't use initialArray in the same way
                    // Might need a different visualization type prop for CodePlayer?
                />
            </div>
          )}

          {/* Quiz Section */}
          {sceneQuizzes.length > 0 && (
              <div className="mb-8 p-6 bg-cyan-50 rounded-lg border border-cyan-200">
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
             <button onClick={() => setShowFeynman(true)} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow flex items-center hover:bg-teal-700 transition-colors">
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
const createGraphTracer = () => ({ init: () => {}, step: () => {}, end: () => {}, getSteps: () => [] });

export default GraphScene; 