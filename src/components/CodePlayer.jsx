import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css';

const CodePlayer = ({ 
  algorithm,
  code,
  tracer,
  initialArray = [8, 4, 2, 5, 1, 9, 7], 
  language = 'javascript'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [isVisualizationExpanded, setIsVisualizationExpanded] = useState(true);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const playbackIntervalRef = useRef(null);
  const codeRef = useRef(null);
  
  // Apply syntax highlighting when code changes
  useEffect(() => {
    if (codeRef.current && code) {
      Prism.highlightElement(codeRef.current);
    }
  }, [codeRef, code, language]);
  
  // Generate algorithm steps using the tracer function
  useEffect(() => {
    if (tracer && typeof tracer === 'function') {
      try {
        // Execute the tracer function with the initial array
        // This assumes tracer functions accept the array and return a tracer object
        // Add target for binary search tracer if applicable
        let tracerInstance;
        if (algorithm === 'binary-search') {
             // Simple heuristic: search for the middle element or a common value
             const sortedArr = [...initialArray].sort((a, b) => a - b);
             const target = sortedArr[Math.floor(sortedArr.length / 2)] || 4;
             tracerInstance = tracer(sortedArr, target);
        } else {
             tracerInstance = tracer(initialArray);
        }
        
        // Get the generated steps
        const steps = tracerInstance.getSteps ? tracerInstance.getSteps() : [];
        setAlgorithmSteps(steps);
        setCurrentStep(0); // Reset to first step when steps change
        setIsPlaying(false); // Ensure player is paused initially
      } catch (error) {
        console.error("Error running algorithm tracer:", error);
        setAlgorithmSteps([{ 
          type: 'error', 
          array: [], 
          message: 'Error tracing algorithm execution.',
          highlights: [],
          lineNumber: 0
        }]);
      }
    } else {
      // Handle case where tracer is missing or not a function
       setAlgorithmSteps([{ 
          type: 'error', 
          array: [], 
          message: 'Algorithm tracer not provided or invalid.',
          highlights: [],
          lineNumber: 0
        }]);
    }
  }, [algorithm, tracer, initialArray]);
  
  // Playback control
  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep >= algorithmSteps.length - 1) {
            setIsPlaying(false);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(playbackIntervalRef.current);
    }
    
    return () => clearInterval(playbackIntervalRef.current);
  }, [isPlaying, playbackSpeed, algorithmSteps.length]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handleStepForward = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };
  
  // Handle potential missing steps gracefully
  const currentStepData = algorithmSteps[currentStep] || algorithmSteps[0] || {
    array: initialArray, // Show initial array if steps fail
    message: 'Initializing...',
    highlights: [],
    lineNumber: 0
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Code */}
        <div className={`code-section w-full md:w-1/2 transition-all duration-500 ${isCodeExpanded ? 'md:w-2/3' : ''}`}>
          <div className="flex items-center justify-between bg-gray-900 p-3 border-b border-gray-700">
            <div className="flex items-center">
              <span className="text-white font-medium">Algorithm Code</span>
              <div className="ml-2 flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsCodeExpanded(!isCodeExpanded)}
            >
              {isCodeExpanded ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              }
            </button>
          </div>
          
          <div className="p-4 relative">
            <pre className={`language-${language} text-sm md:text-base overflow-x-auto`}>
              <code ref={codeRef} className={`language-${language}`}>
                {code || '// No code provided'}
              </code>
            </pre>
            
            {/* Highlight current line */}
            {currentStepData.lineNumber > 0 && (
              <div 
                className="absolute left-0 right-0 bg-indigo-700 bg-opacity-40 pointer-events-none"
                style={{ 
                  top: `${(currentStepData.lineNumber - 1) * 1.5 + 1}rem`,
                  height: '1.5rem'
                }}
              ></div>
            )}
          </div>
        </div>
        
        {/* Right side - Visualization */}
        <div className={`visualization-section w-full md:w-1/2 transition-all duration-500 ${isVisualizationExpanded ? 'md:w-2/3' : ''}`}>
          <div className="flex items-center justify-between bg-gray-800 p-3 border-b border-gray-700">
            <span className="text-white font-medium">Visualization</span>
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsVisualizationExpanded(!isVisualizationExpanded)}
            >
              {isVisualizationExpanded ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              }
            </button>
          </div>
          
          <div className="p-6 bg-gray-800 h-64 flex flex-col">
            {/* Array visualization */}
            <div className="flex items-end justify-center h-32 mb-4">
              {currentStepData.array.map((value, index) => (
                <motion.div
                  key={`${index}-${value}`}
                  className={`w-10 mx-1 flex flex-col items-center ${
                    currentStepData.highlights.includes(index)
                      ? 'bg-indigo-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ height: `${(value / Math.max(...currentStepData.array)) * 100}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <span className="text-white text-xs font-bold mt-2">{value}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Status message */}
            <div className="bg-gray-900 p-3 rounded text-white text-sm mb-4">
              {currentStepData.message}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={handleStepBackward}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                  disabled={currentStep === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded w-10 h-10 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleStepForward}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                  disabled={currentStep === algorithmSteps.length - 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-white text-xs">Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={handleSpeedChange}
                  className="bg-gray-700 text-white text-xs rounded p-1"
                >
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="4">4x</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="bg-gray-900 h-2">
        <div
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${(currentStep / (algorithmSteps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CodePlayer; 