import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PlaygroundLab = () => {
  const navigate = useNavigate();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showIntuition, setShowIntuition] = useState(false);
  const [visualizationData, setVisualizationData] = useState([]);
  const [visualizationStep, setVisualizationStep] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIntervalRef = useRef(null);
  const codeEditorRef = useRef(null);
  
  // Available algorithms
  const algorithms = [
    { id: 'bubbleSort', name: 'Bubble Sort', category: 'sorting' },
    { id: 'quickSort', name: 'Quick Sort', category: 'sorting' },
    { id: 'mergeSort', name: 'Merge Sort', category: 'sorting' },
    { id: 'binarySearch', name: 'Binary Search', category: 'searching' },
    { id: 'depthFirstSearch', name: 'Depth-First Search', category: 'graphs' },
    { id: 'breadthFirstSearch', name: 'Breadth-First Search', category: 'graphs' },
    { id: 'fibonacci', name: 'Fibonacci', category: 'recursion' },
    { id: 'dijkstra', name: 'Dijkstra Algorithm', category: 'graphs' }
  ];
  
  // Load initial code when algorithm changes
  useEffect(() => {
    // Load template code for the selected algorithm
    const loadTemplateCode = async () => {
      try {
        // In a real app, this would load from a file or API
        // For now, we'll use hardcoded templates
        setCode(getTemplateCode(selectedAlgorithm));
        setOutput('');
        setVisualizationData([]);
        setVisualizationStep(0);
      } catch (error) {
        console.error('Error loading template code:', error);
      }
    };
    
    loadTemplateCode();
    stopAutoPlay();
  }, [selectedAlgorithm]);
  
  // Auto-play visualization
  useEffect(() => {
    if (isAutoPlaying && visualizationData.length > 0) {
      autoPlayIntervalRef.current = setInterval(() => {
        setVisualizationStep(prevStep => {
          const nextStep = prevStep + 1;
          if (nextStep >= visualizationData.length) {
            stopAutoPlay();
            return prevStep;
          }
          return nextStep;
        });
      }, 1000 / playbackSpeed);
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, visualizationData, playbackSpeed]);
  
  // Get template code for the selected algorithm
  const getTemplateCode = (algorithmId) => {
    switch (algorithmId) {
      case 'bubbleSort':
        return `function bubbleSort(arr) {
  // Create a copy of the input array to avoid mutating it
  const result = [...arr];
  const n = result.length;
  
  // Visualization data will be populated here
  const steps = [];
  steps.push({
    array: [...result],
    comparingIndices: [],
    swappedIndices: []
  });
  
  // Bubble sort implementation
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Record the comparison
      steps.push({
        array: [...result],
        comparingIndices: [j, j+1],
        swappedIndices: []
      });
      
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        
        // Record the swap
        steps.push({
          array: [...result],
          comparingIndices: [j, j+1],
          swappedIndices: [j, j+1]
        });
      }
    }
  }
  
  return { result, steps };
}

// Test the algorithm with this example array
const array = [5, 3, 8, 4, 2];
const { result, steps } = bubbleSort(array);

console.log('Original array:', array);
console.log('Sorted array:', result);

// Return the visualization data
return steps;`;
        
      case 'binarySearch':
        return `function binarySearch(arr, target) {
  // Create a copy of the input array
  const array = [...arr];
  // Binary search requires a sorted array
  array.sort((a, b) => a - b);
  
  // Visualization data will be populated here
  const steps = [];
  steps.push({
    array: [...array],
    activeIndices: [],
    lowIndex: 0,
    highIndex: array.length - 1,
    midIndex: null,
    found: false
  });
  
  let low = 0;
  let high = array.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Record the current state
    steps.push({
      array: [...array],
      activeIndices: [mid],
      lowIndex: low,
      highIndex: high,
      midIndex: mid,
      found: array[mid] === target
    });
    
    if (array[mid] === target) {
      return { 
        found: true, 
        index: mid,
        steps 
      };
    }
    
    if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  // If we get here, the target wasn't found
  steps.push({
    array: [...array],
    activeIndices: [],
    lowIndex: low,
    highIndex: high,
    midIndex: null,
    found: false
  });
  
  return { 
    found: false, 
    index: -1,
    steps 
  };
}

// Test the algorithm with this example array
const array = [2, 3, 4, 5, 8, 12, 16, 23];
const target = 12;
const { found, index, steps } = binarySearch(array, target);

console.log('Array:', array);
console.log('Target:', target);
console.log('Found:', found);
console.log('Index:', index);

// Return the visualization data
return steps;`;
        
      default:
        return '// Select an algorithm from the dropdown menu\n// to see template code and visualizations';
    }
  };
  
  // Run the code
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      // Capture console.log output
      const originalConsoleLog = console.log;
      const logs = [];
      
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
        ).join(' '));
        originalConsoleLog(...args);
      };
      
      // Execute the code and get visualization data
      const result = new Function(code + '\n//# sourceURL=playground.js')();
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      // Set the output
      setOutput(logs.join('\n'));
      
      // Set visualization data if the code returned it
      if (Array.isArray(result)) {
        setVisualizationData(result);
        setVisualizationStep(0);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    
    setIsRunning(false);
  };
  
  // Start auto-play
  const handleAutoPlay = () => {
    if (visualizationData.length === 0) return;
    
    // If we're at the end, restart from the beginning
    if (visualizationStep >= visualizationData.length - 1) {
      setVisualizationStep(0);
    }
    
    setIsAutoPlaying(true);
  };
  
  // Stop auto-play
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };
  
  // Step forward
  const handleStepForward = () => {
    if (visualizationStep < visualizationData.length - 1) {
      setVisualizationStep(visualizationStep + 1);
    }
  };
  
  // Step backward
  const handleStepBackward = () => {
    if (visualizationStep > 0) {
      setVisualizationStep(visualizationStep - 1);
    }
  };
  
  // Reset visualization
  const handleResetVisualization = () => {
    setVisualizationStep(0);
    stopAutoPlay();
  };
  
  // Render array visualization
  const renderArrayVisualization = () => {
    if (!visualizationData || visualizationData.length === 0 || !visualizationData[visualizationStep]) {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-800 rounded-lg">
          <p className="text-gray-400">Run the code to see visualization</p>
        </div>
      );
    }
    
    const stepData = visualizationData[visualizationStep];
    const array = stepData.array || [];
    const comparingIndices = stepData.comparingIndices || [];
    const swappedIndices = stepData.swappedIndices || [];
    const activeIndices = stepData.activeIndices || [];
    
    // Find the max value for scaling
    const maxValue = Math.max(...array, 1);
    
    return (
      <div className="p-4 bg-gray-800 rounded-lg">
        <div className="flex items-end justify-around h-40 gap-1">
          {array.map((value, index) => (
            <div
              key={index}
              className={`w-8 rounded-t-lg flex items-end justify-center transition-all duration-300 ${
                comparingIndices.includes(index)
                  ? 'bg-yellow-500'
                  : swappedIndices.includes(index)
                    ? 'bg-green-500'
                    : activeIndices.includes(index)
                      ? 'bg-blue-500'
                      : 'bg-indigo-500'
              }`}
              style={{
                height: `${(value / maxValue) * 100}%`,
                minHeight: '20px'
              }}
            >
              <span className="text-xs font-bold text-white mb-1">{value}</span>
            </div>
          ))}
        </div>
        
        {/* Binary search specific visualization */}
        {stepData.lowIndex !== undefined && (
          <div className="mt-4 flex justify-between text-xs text-gray-400">
            <div>
              Low: {stepData.lowIndex}
            </div>
            <div>
              Mid: {stepData.midIndex !== null ? stepData.midIndex : 'N/A'}
            </div>
            <div>
              High: {stepData.highIndex}
            </div>
            <div>
              {stepData.found ? '✅ Found!' : ''}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Get algorithm intuition
  const getAlgorithmIntuition = () => {
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        return {
          title: 'Bubble Sort Intuition',
          description: 'Imagine bubbles rising in water. Larger bubbles (values) rise to the top more quickly. In each pass, adjacent elements are compared and swapped if they are in the wrong order, causing larger elements to "bubble up" to the end of the array.',
          complexity: 'Time: O(n²), Space: O(1)',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif'
        };
      case 'binarySearch':
        return {
          title: 'Binary Search Intuition',
          description: 'Think of finding a name in a phone book. You open to the middle, see if your name comes before or after, then eliminate half the book. Repeat until you find the name. Binary search works on sorted arrays by repeatedly dividing the search interval in half.',
          complexity: 'Time: O(log n), Space: O(1)',
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg'
        };
      default:
        return {
          title: 'Select an Algorithm',
          description: 'Choose an algorithm from the dropdown to see its intuition.',
          complexity: '',
          image: ''
        };
    }
  };
  
  // Handle back button
  const handleBackClick = () => {
    navigate('/');
  };
  
  // Get algorithm intuition
  const intuition = getAlgorithmIntuition();
  
  return (
    <div className="min-h-screen bg-gray-900 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <button 
                className="flex items-center text-white mb-2 md:mb-0 hover:text-blue-300 transition-colors"
                onClick={handleBackClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Galaxy
              </button>
              <h1 className="text-3xl font-bold mt-2">Algorithm Playground</h1>
              <p className="text-blue-300 mt-1">Experiment with algorithms and see them in action</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                className={`px-4 py-2 ${
                  showIntuition 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } rounded-lg transition-colors flex items-center space-x-2`}
                onClick={() => setShowIntuition(!showIntuition)}
              >
                <span className="text-lg">💡</span>
                <span>Show Intuition</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Code editor */}
          <div className="lg:w-1/2">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label htmlFor="algorithm" className="block text-sm font-medium text-gray-400 mb-1">
                  Algorithm
                </label>
                <select
                  id="algorithm"
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                >
                  <option value="" disabled>Select an algorithm</option>
                  <optgroup label="Sorting">
                    {algorithms.filter(algo => algo.category === 'sorting').map(algo => (
                      <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Searching">
                    {algorithms.filter(algo => algo.category === 'searching').map(algo => (
                      <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Graphs">
                    {algorithms.filter(algo => algo.category === 'graphs').map(algo => (
                      <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Recursion">
                    {algorithms.filter(algo => algo.category === 'recursion').map(algo => (
                      <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Run Code
                  </>
                )}
              </button>
            </div>
            
            {/* Code editor */}
            <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-800 text-white px-4 py-2 font-semibold flex justify-between">
                <span>JavaScript Editor</span>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
              </div>
              <div className="bg-gray-900 text-white p-4 h-80 overflow-auto">
                <textarea
                  ref={codeEditorRef}
                  className="w-full h-full bg-transparent focus:outline-none font-mono resize-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                ></textarea>
              </div>
            </div>
            
            {/* Console output */}
            <div className="bg-black rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-800 text-white px-4 py-2 font-semibold">Console Output</div>
              <div className="p-4 h-28 overflow-auto">
                <pre className="text-green-400 font-mono text-sm">{output}</pre>
              </div>
            </div>
          </div>
          
          {/* Right column - Visualization */}
          <div className="lg:w-1/2">
            {/* Intuition panel - Hidden by default */}
            <AnimatePresence>
              {showIntuition && (
                <motion.div
                  className="mb-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{intuition.title}</h3>
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => setShowIntuition(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{intuition.description}</p>
                    
                    {intuition.complexity && (
                      <div className="mb-4 text-sm">
                        <span className="text-gray-400">Complexity:</span> <span className="text-blue-300 font-mono">{intuition.complexity}</span>
                      </div>
                    )}
                    
                    {intuition.image && (
                      <div className="flex justify-center bg-gray-900 p-4 rounded">
                        <img 
                          src={intuition.image} 
                          alt={intuition.title} 
                          className="max-h-48 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Visualization panel */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-700 text-white px-4 py-2 font-semibold flex justify-between items-center">
                <span>Algorithm Visualization</span>
                <div className="text-sm text-gray-300">
                  {visualizationData.length > 0 && (
                    <span>Step {visualizationStep + 1} of {visualizationData.length}</span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {renderArrayVisualization()}
                
                {/* Visualization controls */}
                {visualizationData.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleResetVisualization}
                        disabled={visualizationStep === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      
                      <button
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleStepBackward}
                        disabled={visualizationStep === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={isAutoPlaying ? stopAutoPlay : handleAutoPlay}
                      >
                        {isAutoPlaying ? (
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
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleStepForward}
                        disabled={visualizationStep === visualizationData.length - 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Speed:</span>
                      <select
                        className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1x</option>
                        <option value={2}>2x</option>
                        <option value={4}>4x</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Algorithm details */}
            <div className="mt-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-700 text-white px-4 py-2 font-semibold">
                Algorithm Details
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                    <p className="text-white">
                      {algorithms.find(algo => algo.id === selectedAlgorithm)?.category.charAt(0).toUpperCase() + 
                        algorithms.find(algo => algo.id === selectedAlgorithm)?.category.slice(1) || 'N/A'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Difficulty</h4>
                    <p className="text-white">
                      {selectedAlgorithm === 'bubbleSort' || selectedAlgorithm === 'binarySearch'
                        ? 'Easy'
                        : selectedAlgorithm === 'mergeSort' || selectedAlgorithm === 'breadthFirstSearch'
                          ? 'Medium'
                          : 'Hard'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 text-gray-300 text-sm">
                  <p>
                    Edit the code above and click "Run Code" to see your changes in the visualization.
                    The visualization will update based on the data returned by your code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AnimatePresence component for framer-motion
const AnimatePresence = ({ children }) => {
  return children;
};

export default PlaygroundLab; 