/**
 * Utility for tracing algorithm execution to create visualizations
 */

/**
 * Creates a tracer for array operations
 * @returns {Object} - Tracer object with methods
 */
export const createArrayTracer = () => {
  const steps = [];
  let currentArray = [];
  let currentStep = 0;
  
  return {
    /**
     * Set the initial array
     * @param {Array} array - Initial array
     */
    init: (array) => {
      currentArray = [...array];
      steps.push({
        type: 'init',
        array: [...currentArray],
        message: 'Initial array',
        highlights: []
      });
    },
    
    /**
     * Record a comparison between two elements
     * @param {number} i - First index
     * @param {number} j - Second index
     * @param {string} message - Description of comparison
     */
    compare: (i, j, message = 'Comparing elements') => {
      steps.push({
        type: 'compare',
        array: [...currentArray],
        message,
        highlights: [i, j]
      });
    },
    
    /**
     * Record a swap between two elements
     * @param {number} i - First index
     * @param {number} j - Second index
     * @param {string} message - Description of swap
     */
    swap: (i, j, message = 'Swapping elements') => {
      // Perform the actual swap
      [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
      
      steps.push({
        type: 'swap',
        array: [...currentArray],
        message,
        highlights: [i, j]
      });
    },
    
    /**
     * Record setting a value
     * @param {number} index - Index to set
     * @param {*} value - New value
     * @param {string} message - Description of set
     */
    set: (index, value, message = 'Setting value') => {
      currentArray[index] = value;
      
      steps.push({
        type: 'set',
        array: [...currentArray],
        message,
        highlights: [index]
      });
    },
    
    /**
     * Record a general step with optional highlights
     * @param {string} message - Description of step
     * @param {Array} highlights - Indices to highlight
     */
    step: (message, highlights = []) => {
      steps.push({
        type: 'step',
        array: [...currentArray],
        message,
        highlights
      });
    },
    
    /**
     * Record the end of the algorithm
     * @param {string} message - Final message
     */
    end: (message = 'Algorithm completed') => {
      steps.push({
        type: 'end',
        array: [...currentArray],
        message,
        highlights: []
      });
    },
    
    /**
     * Get all recorded steps
     * @returns {Array} - Steps
     */
    getSteps: () => steps,
    
    /**
     * Get the current step
     * @returns {Object} - Current step
     */
    getCurrentStep: () => steps[currentStep],
    
    /**
     * Move to the next step
     * @returns {Object} - Next step or null if at end
     */
    nextStep: () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Move to the previous step
     * @returns {Object} - Previous step or null if at beginning
     */
    prevStep: () => {
      if (currentStep > 0) {
        currentStep--;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Go to a specific step
     * @param {number} stepIndex - Index of step
     * @returns {Object} - Step or null if invalid index
     */
    goToStep: (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        currentStep = stepIndex;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Reset to the beginning
     * @returns {Object} - First step
     */
    reset: () => {
      currentStep = 0;
      return steps[0];
    }
  };
};

/**
 * Creates a tracer for graph algorithms
 * @returns {Object} - Tracer object with methods
 */
export const createGraphTracer = () => {
  const steps = [];
  let currentNodes = [];
  let currentEdges = [];
  let currentStep = 0;
  
  return {
    /**
     * Initialize the graph
     * @param {Array} nodes - Array of nodes
     * @param {Array} edges - Array of edges
     */
    init: (nodes, edges) => {
      currentNodes = [...nodes];
      currentEdges = [...edges];
      
      steps.push({
        type: 'init',
        nodes: [...currentNodes],
        edges: [...currentEdges],
        message: 'Initial graph',
        highlightNodes: [],
        highlightEdges: []
      });
    },
    
    /**
     * Record visiting a node
     * @param {*} nodeId - ID of the node
     * @param {string} message - Description
     */
    visitNode: (nodeId, message = 'Visiting node') => {
      steps.push({
        type: 'visitNode',
        nodes: [...currentNodes],
        edges: [...currentEdges],
        message,
        highlightNodes: [nodeId],
        highlightEdges: []
      });
    },
    
    /**
     * Record traversing an edge
     * @param {*} fromNodeId - Source node ID
     * @param {*} toNodeId - Target node ID
     * @param {string} message - Description
     */
    traverseEdge: (fromNodeId, toNodeId, message = 'Traversing edge') => {
      const edgeId = `${fromNodeId}-${toNodeId}`;
      
      steps.push({
        type: 'traverseEdge',
        nodes: [...currentNodes],
        edges: [...currentEdges],
        message,
        highlightNodes: [fromNodeId, toNodeId],
        highlightEdges: [edgeId]
      });
    },
    
    /**
     * Record a general step with optional highlights
     * @param {string} message - Description
     * @param {Array} highlightNodes - Node IDs to highlight
     * @param {Array} highlightEdges - Edge IDs to highlight
     */
    step: (message, highlightNodes = [], highlightEdges = []) => {
      steps.push({
        type: 'step',
        nodes: [...currentNodes],
        edges: [...currentEdges],
        message,
        highlightNodes,
        highlightEdges
      });
    },
    
    /**
     * Record completing the algorithm
     * @param {string} message - Final message
     */
    end: (message = 'Algorithm completed') => {
      steps.push({
        type: 'end',
        nodes: [...currentNodes],
        edges: [...currentEdges],
        message,
        highlightNodes: [],
        highlightEdges: []
      });
    },
    
    /**
     * Get all recorded steps
     * @returns {Array} - Steps
     */
    getSteps: () => steps,
    
    /**
     * Get the current step
     * @returns {Object} - Current step
     */
    getCurrentStep: () => steps[currentStep],
    
    /**
     * Move to the next step
     * @returns {Object} - Next step or null if at end
     */
    nextStep: () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Move to the previous step
     * @returns {Object} - Previous step or null if at beginning
     */
    prevStep: () => {
      if (currentStep > 0) {
        currentStep--;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Go to a specific step
     * @param {number} stepIndex - Index of step
     * @returns {Object} - Step or null if invalid index
     */
    goToStep: (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        currentStep = stepIndex;
        return steps[currentStep];
      }
      return null;
    },
    
    /**
     * Reset to the beginning
     * @returns {Object} - First step
     */
    reset: () => {
      currentStep = 0;
      return steps[0];
    }
  };
};

/**
 * Sample implementations of common algorithms using the tracers
 */

/**
 * Bubble sort with tracing
 * @param {Array} array - Array to sort
 * @returns {Object} - Tracer with recorded steps
 */
export const traceBubbleSort = (array) => {
  const tracer = createArrayTracer();
  tracer.init([...array]);
  
  const n = array.length;
  const arr = [...array];
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      tracer.compare(j, j + 1, `Comparing arr[${j}]=${arr[j]} and arr[${j+1}]=${arr[j+1]}`);
      
      if (arr[j] > arr[j + 1]) {
        tracer.swap(j, j + 1, `Swapping arr[${j}]=${arr[j]} and arr[${j+1}]=${arr[j+1]}`);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    
    tracer.step(`Iteration ${i+1} complete, largest element is now at position ${n-i-1}`);
  }
  
  tracer.end('Bubble sort completed');
  return tracer;
};

/**
 * Binary search with tracing
 * @param {Array} sortedArray - Sorted array to search in
 * @param {*} target - Value to find
 * @returns {Object} - Tracer with recorded steps
 */
export const traceBinarySearch = (sortedArray, target) => {
  const tracer = createArrayTracer();
  tracer.init([...sortedArray]);
  
  const arr = [...sortedArray];
  let left = 0;
  let right = arr.length - 1;
  
  tracer.step(`Searching for target ${target} in the array`, []);
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    tracer.step(`Checking middle element at index ${mid}: ${arr[mid]}`, [mid]);
    
    if (arr[mid] === target) {
      tracer.step(`Found target ${target} at index ${mid}`, [mid]);
      tracer.end(`Search successful, target ${target} found at index ${mid}`);
      return tracer;
    }
    
    if (arr[mid] < target) {
      tracer.step(`${arr[mid]} < ${target}, searching right half`, [mid]);
      left = mid + 1;
    } else {
      tracer.step(`${arr[mid]} > ${target}, searching left half`, [mid]);
      right = mid - 1;
    }
  }
  
  tracer.end(`Target ${target} not found in the array`);
  return tracer;
};

// --- Placeholder Tracers --- 

// Helper function to create a minimal tracer object
const createPlaceholderTracer = (initialData, messagePrefix = "Algorithm") => {
    const tracer = createArrayTracer(); // Use array tracer as a generic base
    tracer.init(Array.isArray(initialData) ? initialData : []);
    tracer.step(`${messagePrefix}: Placeholder trace - Not implemented`);
    tracer.end(`${messagePrefix}: Placeholder trace complete`);
    return tracer;
};

// Placeholder for Selection Sort
export const traceSelectionSort = (array) => {
    console.warn("traceSelectionSort is not implemented. Using placeholder.");
    return createPlaceholderTracer(array, "Selection Sort");
};

// Placeholder for Insertion Sort
export const traceInsertionSort = (array) => {
    console.warn("traceInsertionSort is not implemented. Using placeholder.");
    return createPlaceholderTracer(array, "Insertion Sort");
};

// Placeholder for Fibonacci
export const traceFibonacci = (n) => {
    console.warn("traceFibonacci is not implemented. Using placeholder.");
    // Fibonacci doesn't map well to array tracer, return minimal steps
    return { 
        getSteps: () => [
            { type: 'init', array: [n], message: `Calculating fib(${n})...`, highlights: [] },
            { type: 'step', array: [n], message: 'Placeholder trace...', highlights: [] },
            { type: 'end', array: [n], message: 'Placeholder trace complete.', highlights: [] }
        ]
    };
};

// Placeholder for BFS
export const traceBFS = (graph) => {
    console.warn("traceBFS is not implemented. Using placeholder.");
    const tracer = createGraphTracer ? createGraphTracer() : createPlaceholderTracer([], "BFS"); 
    if (graph?.nodes && graph?.edges) tracer.init(graph.nodes, graph.edges);
    tracer.step("BFS: Placeholder trace - Not implemented");
    tracer.end("BFS: Placeholder trace complete");
    return tracer;
};

// Placeholder for DFS
export const traceDFS = (graph) => {
    console.warn("traceDFS is not implemented. Using placeholder.");
    const tracer = createGraphTracer ? createGraphTracer() : createPlaceholderTracer([], "DFS");
    if (graph?.nodes && graph?.edges) tracer.init(graph.nodes, graph.edges);
    tracer.step("DFS: Placeholder trace - Not implemented");
    tracer.end("DFS: Placeholder trace complete");
    return tracer;
};

// Placeholder for Knapsack
export const traceKnapsack = (dpInput) => {
    console.warn("traceKnapsack is not implemented. Using placeholder.");
    // DP might use a table, adapt placeholder as needed
    return createPlaceholderTracer([], "Knapsack"); 
};

// Placeholder for LCS
export const traceLCS = (dpInput) => {
    console.warn("traceLCS is not implemented. Using placeholder.");
    return createPlaceholderTracer([], "LCS");
};

// Placeholder for BST Insert
export const traceBSTInsert = (treeStructure, value) => {
    console.warn("traceBSTInsert is not implemented. Using placeholder.");
    // Needs a tree tracer or adapted array tracer
    return createPlaceholderTracer([value], "BST Insert");
};

// Placeholder for BST Search
export const traceBSTSearch = (treeStructure, value) => {
    console.warn("traceBSTSearch is not implemented. Using placeholder.");
    return createPlaceholderTracer([value], "BST Search");
}; 