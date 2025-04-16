import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUserProgress } from '../context/UserProgressContext';
import FeynmanModal from '../components/FeynmanModal';
import { useParams } from 'react-router-dom';
import ConceptCard from '../components/ConceptCard';
import CodePlayer from '../components/CodePlayer';
import QuizCard from '../components/QuizCard';
import conceptData from '../data/concepts.json';
import quizBank from '../data/quizBank.json';
import { traceBSTInsert, traceBSTSearch } from '../utils/traceAlgorithm';

// Binary Search Tree node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.height = 1;
  }
}

// Helper (assuming it's defined elsewhere or here)
const getSceneData = (sceneId) => {
  const category = conceptData.categories.find(cat => cat.id === sceneId);
  if (!category) return { category: null, concepts: [], quizzes: [] };
  const quizzes = quizBank.questions.filter(q => q.topic === sceneId);
  return { category, concepts: category.concepts || [], quizzes };
};

// BST Scene Component
const BinarySearchTreeScene = () => {
  const { sceneId = 'binary-search-tree' } = useParams();
  const { userProgress, markSceneInProgress, markSceneCompleted, addXp } = useUserProgress();

  const { category, concepts, quizzes } = useMemo(() => getSceneData(sceneId), [sceneId]);

  const [tree, setTree] = useState(null);
  const [treeNodes, setTreeNodes] = useState([]);
  const [treeEdges, setTreeEdges] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [animationActive, setAnimationActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState('Welcome to Binary Search Trees!');
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [traversalType, setTraversalType] = useState('inorder');
  const [showFeynman, setShowFeynman] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [selectedConceptId, setSelectedConceptId] = useState(concepts[0]?.id || 'bst-insertion');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bstInput, setBstInput] = useState(15);
  const [bstInitialStructure, setBstInitialStructure] = useState([10, 5, 20, 3, 7, 18, 25]);
  
  const animationRef = useRef(null);
  const svgRef = useRef(null);
  
  const { isDarkMode } = useTheme();
  
  // Initialize the scene
  useEffect(() => {
    if (sceneId && !userProgress.completedScenes.includes(sceneId)) {
      markSceneInProgress(sceneId);
    }
    if (userProgress.completedScenes.includes(sceneId)) {
      setIsCompleted(true);
      setQuizCompleted(true);
    }
    
    // Create initial tree with sample values
    const rootNode = new TreeNode(50);
    insertNode(rootNode, 30);
    insertNode(rootNode, 70);
    insertNode(rootNode, 20);
    insertNode(rootNode, 40);
    insertNode(rootNode, 60);
    insertNode(rootNode, 80);
    
    setTree(rootNode);
    
    // Clean up when unmounting
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [sceneId, markSceneInProgress, userProgress.completedScenes]);
  
  // Update the visual representation when the tree changes
  useEffect(() => {
    if (tree) {
      const nodes = [];
      const edges = [];
      
      // Calculate positions for each node
      const calculatePositions = (node, x, y, horizontalSpacing) => {
        if (!node) return;
        
        // Save node position
        node.x = x;
        node.y = y;
        nodes.push({
          id: `node-${node.value}`,
          value: node.value,
          x,
          y
        });
        
        // Calculate child positions and edges
        if (node.left) {
          edges.push({
            id: `${node.value}-${node.left.value}`,
            source: { x, y },
            target: { x: x - horizontalSpacing, y: y + 70 }
          });
          calculatePositions(node.left, x - horizontalSpacing, y + 70, horizontalSpacing / 2);
        }
        
        if (node.right) {
          edges.push({
            id: `${node.value}-${node.right.value}`,
            source: { x, y },
            target: { x: x + horizontalSpacing, y: y + 70 }
          });
          calculatePositions(node.right, x + horizontalSpacing, y + 70, horizontalSpacing / 2);
        }
      };
      
      // Start with root at center, with wide spacing
      calculatePositions(tree, 400, 70, 150);
      
      setTreeNodes(nodes);
      setTreeEdges(edges);
    }
  }, [tree]);
  
  // Tree operations
  const insertNode = (root, value) => {
    if (!root) return new TreeNode(value);
    
    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }
    
    // Update height
    root.height = 1 + Math.max(
      root.left ? root.left.height : 0,
      root.right ? root.right.height : 0
    );
    
    return root;
  };
  
  const findMinValueNode = (node) => {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  };
  
  const deleteNode = (root, value) => {
    if (!root) return root;
    
    // Recursively find the node to delete
    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      // Node with only one child or no child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      
      // Node with two children
      // Get the inorder successor (smallest in the right subtree)
      const temp = findMinValueNode(root.right);
      root.value = temp.value;
      
      // Delete the inorder successor
      root.right = deleteNode(root.right, temp.value);
    }
    
    // Update height
    root.height = 1 + Math.max(
      root.left ? root.left.height : 0,
      root.right ? root.right.height : 0
    );
    
    return root;
  };
  
  // Animated insertion
  const animateInsertion = async () => {
    if (!inputValue || isNaN(parseInt(inputValue))) {
      setMessage('Please enter a valid number');
      return;
    }
    
    const value = parseInt(inputValue);
    
    // Check if value already exists
    if (doesNodeExist(tree, value)) {
      setMessage(`Value ${value} already exists in the tree`);
      return;
    }
    
    setAnimationActive(true);
    setHighlightedNodes([]);
    setMessage(`Inserting ${value} into the tree...`);
    
    // Clone the tree so we don't modify the original during animation
    const clonedTree = JSON.parse(JSON.stringify(tree));
    let currentNode = clonedTree;
    
    // Animate searching for the right spot
    while (true) {
      setHighlightedNodes([`node-${currentNode.value}`]);
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 800);
      });
      
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          // We found where to insert
          setMessage(`Inserting ${value} as left child of ${currentNode.value}`);
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          // We found where to insert
          setMessage(`Inserting ${value} as right child of ${currentNode.value}`);
          break;
        }
        currentNode = currentNode.right;
      }
    }
    
    // Actually insert the node into the real tree
    const newTree = JSON.parse(JSON.stringify(tree));
    insertNode(newTree, value);
    setTree(newTree);
    
    // Reset state
    await new Promise(resolve => {
      animationRef.current = setTimeout(resolve, 1000);
    });
    
    setHighlightedNodes([`node-${value}`]);
    setMessage(`Successfully inserted ${value}`);
    setInputValue('');
    
    // After a moment, clear highlight
    await new Promise(resolve => {
      animationRef.current = setTimeout(resolve, 1500);
    });
    
    setHighlightedNodes([]);
    setAnimationActive(false);
    addXp(10);
  };
  
  // Animated deletion
  const animateDeletion = async () => {
    if (!inputValue || isNaN(parseInt(inputValue))) {
      setMessage('Please enter a valid number');
      return;
    }
    
    const value = parseInt(inputValue);
    
    // Check if value exists
    if (!doesNodeExist(tree, value)) {
      setMessage(`Value ${value} does not exist in the tree`);
      return;
    }
    
    setAnimationActive(true);
    setHighlightedNodes([]);
    setMessage(`Searching for ${value} to delete...`);
    
    // Animate searching for the node
    let currentNode = tree;
    const path = [];
    
    while (currentNode) {
      path.push(`node-${currentNode.value}`);
      setHighlightedNodes([...path]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 700);
      });
      
      if (value === currentNode.value) {
        setMessage(`Found ${value}. Deleting...`);
        break;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    // Highlight the node to delete
    setHighlightedNodes([`node-${value}`]);
    
    await new Promise(resolve => {
      animationRef.current = setTimeout(resolve, 1000);
    });
    
    // Actually delete the node
    const newTree = JSON.parse(JSON.stringify(tree));
    const result = deleteNode(newTree, value);
    setTree(result);
    
    setMessage(`Successfully deleted ${value}`);
    setInputValue('');
    
    // After a moment, clear highlight
    await new Promise(resolve => {
      animationRef.current = setTimeout(resolve, 1500);
    });
    
    setHighlightedNodes([]);
    setAnimationActive(false);
    addXp(10);
  };
  
  // Animated traversal
  const animateTraversal = async () => {
    setAnimationActive(true);
    setHighlightedNodes([]);
    setTraversalResult([]);
    
    let result = [];
    const visitOrder = [];
    
    const inorderTraversal = async (node) => {
      if (!node) return;
      
      // Visit left
      if (node.left) {
        setMessage(`Traversing left subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.left.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await inorderTraversal(node.left);
      }
      
      // Visit node
      setMessage(`Visiting node ${node.value}`);
      setHighlightedNodes([`node-${node.value}`]);
      visitOrder.push(node.value);
      setTraversalResult([...visitOrder]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000);
      });
      
      // Visit right
      if (node.right) {
        setMessage(`Traversing right subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.right.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await inorderTraversal(node.right);
      }
    };
    
    const preorderTraversal = async (node) => {
      if (!node) return;
      
      // Visit node
      setMessage(`Visiting node ${node.value}`);
      setHighlightedNodes([`node-${node.value}`]);
      visitOrder.push(node.value);
      setTraversalResult([...visitOrder]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000);
      });
      
      // Visit left
      if (node.left) {
        setMessage(`Traversing left subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.left.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await preorderTraversal(node.left);
      }
      
      // Visit right
      if (node.right) {
        setMessage(`Traversing right subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.right.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await preorderTraversal(node.right);
      }
    };
    
    const postorderTraversal = async (node) => {
      if (!node) return;
      
      // Visit left
      if (node.left) {
        setMessage(`Traversing left subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.left.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await postorderTraversal(node.left);
      }
      
      // Visit right
      if (node.right) {
        setMessage(`Traversing right subtree of ${node.value}`);
        setHighlightedNodes([`node-${node.value}`, `node-${node.right.value}`]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 800);
        });
        
        await postorderTraversal(node.right);
      }
      
      // Visit node
      setMessage(`Visiting node ${node.value}`);
      setHighlightedNodes([`node-${node.value}`]);
      visitOrder.push(node.value);
      setTraversalResult([...visitOrder]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000);
      });
    };
    
    setMessage(`Starting ${traversalType} traversal...`);
    
    if (traversalType === 'inorder') {
      await inorderTraversal(tree);
    } else if (traversalType === 'preorder') {
      await preorderTraversal(tree);
    } else if (traversalType === 'postorder') {
      await postorderTraversal(tree);
    }
    
    setMessage(`${traversalType} traversal complete: [${visitOrder.join(', ')}]`);
    setHighlightedNodes([]);
    setAnimationActive(false);
    addXp(15);
  };
  
  // Helper to check if a node exists
  const doesNodeExist = (root, value) => {
    if (!root) return false;
    
    if (root.value === value) {
      return true;
    } else if (value < root.value) {
      return doesNodeExist(root.left, value);
    } else {
      return doesNodeExist(root.right, value);
    }
  };
  
  // Reset the tree to initial state
  const resetTree = () => {
    const rootNode = new TreeNode(50);
    insertNode(rootNode, 30);
    insertNode(rootNode, 70);
    insertNode(rootNode, 20);
    insertNode(rootNode, 40);
    insertNode(rootNode, 60);
    insertNode(rootNode, 80);
    
    setTree(rootNode);
    setHighlightedNodes([]);
    setTraversalResult([]);
    setMessage('Tree reset to initial state');
  };
  
  // Complete the scene
  const completeScene = () => {
    markSceneCompleted(sceneId);
    addXp(50);
    setMessage('Congratulations! You have completed the Binary Search Tree scene!');
  };
  
  // Handle quiz answer
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
  
  const currentConcept = useMemo(() => concepts.find(c => c.id === selectedConceptId), [concepts, selectedConceptId]);
  const sceneQuizzes = useMemo(() => quizzes.filter(q => q.difficulty === 'medium').slice(0, 3), [quizzes]);
  
  // Placeholder tracer logic
  const bstTracer = useMemo(() => {
      // Determine tracer based on selected concept (e.g., Insert or Search)
      if (selectedConceptId === 'bst-insertion') { // Example mapping
          return traceBSTInsert;
      } else if (selectedConceptId === 'bst-search') {
          return traceBSTSearch;
      } else {
          return (tree, value) => {
              console.warn("Tracer not implemented for BST concept:", selectedConceptId);
              const tracer = createTreeTracer(); // Requires createTreeTracer
              tracer.init(tree); // Need a way to represent tree structure
              tracer.step("Tracing BST...");
              tracer.end("Trace complete.");
              return tracer;
          }
      }
  }, [selectedConceptId]);

  if (!category) return <div className="p-8 text-center text-red-500">Error: Scene data not found for ID "{sceneId}".</div>;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
            <h1 className="text-3xl font-bold text-white">Binary Search Trees</h1>
            <p className="mt-2 text-green-100">
              Explore the power of hierarchical data structures
            </p>
          </div>
          
          {/* Main content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Panel - Controls */}
              <div className="md:col-span-1 space-y-6">
                {/* Tree Operations */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-bold mb-3">Tree Operations</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`w-full p-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-800 border-gray-300'
                        } border`}
                        placeholder="Enter a number"
                        disabled={animationActive}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={animateInsertion}
                        disabled={animationActive}
                        className={`py-2 px-4 rounded-md ${
                          animationActive 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white transition-colors`}
                      >
                        Insert
                      </button>
                      
                      <button
                        onClick={animateDeletion}
                        disabled={animationActive}
                        className={`py-2 px-4 rounded-md ${
                          animationActive 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                        } text-white transition-colors`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Traversal */}
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Tree Traversal</h3>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <button
                        className={`px-2 py-1 text-sm rounded ${
                          traversalType === 'inorder' 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setTraversalType('inorder')}
                        disabled={animationActive}
                      >
                        In-order
                      </button>
                      
                      <button
                        className={`px-2 py-1 text-sm rounded ${
                          traversalType === 'preorder' 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setTraversalType('preorder')}
                        disabled={animationActive}
                      >
                        Pre-order
                      </button>
                      
                      <button
                        className={`px-2 py-1 text-sm rounded ${
                          traversalType === 'postorder' 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setTraversalType('postorder')}
                        disabled={animationActive}
                      >
                        Post-order
                      </button>
                    </div>
                    
                    <button
                      onClick={animateTraversal}
                      disabled={animationActive}
                      className={`w-full py-2 px-4 rounded-md ${
                        animationActive 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white transition-colors`}
                    >
                      Start Traversal
                    </button>
                  </div>
                  
                  {/* Reset */}
                  <div className="mt-4">
                    <button
                      onClick={resetTree}
                      disabled={animationActive}
                      className={`w-full py-2 px-4 rounded-md ${
                        animationActive 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                      } text-white transition-colors`}
                    >
                      Reset Tree
                    </button>
                  </div>
                </div>
                
                {/* Results Display */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-bold mb-3">Status</h2>
                  
                  <div className={`p-3 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } min-h-24 flex items-center justify-center text-center mb-3`}>
                    <p>{message}</p>
                  </div>
                  
                  {traversalResult.length > 0 && (
                    <div className="mt-2">
                      <h3 className="font-medium mb-1">Traversal Result:</h3>
                      <div className={`p-2 rounded ${
                        isDarkMode ? 'bg-gray-700' : 'bg-white'
                      } overflow-x-auto whitespace-nowrap`}>
                        <div className="flex">
                          {traversalResult.map((value, index) => (
                            <motion.div
                              key={`${value}-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`px-3 py-1 m-1 rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {value}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Education */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-bold mb-3">Learn More</h2>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowFeynman(true)}
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">🧠</span>
                      Explain in Your Own Words
                    </button>
                    
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">❓</span>
                      Test Your Knowledge
                    </button>
                    
                    <button
                      onClick={completeScene}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">✅</span>
                      Mark as Completed
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Center & Right - Tree Visualization & Info */}
              <div className="md:col-span-2 space-y-6">
                {/* Tree Visualization */}
                <div 
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'} h-96 relative`}
                  ref={svgRef}
                >
                  <h2 className="text-xl font-bold mb-2">Tree Visualization</h2>
                  
                  <svg width="100%" height="85%" viewBox="0 0 800 500" className="overflow-visible">
                    {/* Draw edges first so they appear behind nodes */}
                    {treeEdges.map(edge => (
                      <line
                        key={edge.id}
                        x1={edge.source.x}
                        y1={edge.source.y}
                        x2={edge.target.x}
                        y2={edge.target.y}
                        stroke={isDarkMode ? "#6B7280" : "#9CA3AF"}
                        strokeWidth="2"
                      />
                    ))}
                    
                    {/* Draw nodes */}
                    {treeNodes.map(node => {
                      const isHighlighted = highlightedNodes.includes(node.id);
                      
                      return (
                        <g key={node.id}>
                          <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={30}
                            fill={isHighlighted ? "#10B981" : isDarkMode ? "#1F2937" : "#FFFFFF"}
                            stroke={isHighlighted ? "#059669" : isDarkMode ? "#374151" : "#E5E7EB"}
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          />
                          <text
                            x={node.x}
                            y={node.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isHighlighted ? (isDarkMode ? "#FFFFFF" : "#FFFFFF") : (isDarkMode ? "#FFFFFF" : "#000000")}
                            fontSize="16"
                            fontWeight="bold"
                          >
                            {node.value}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                {/* Educational Content */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-bold mb-3">Binary Search Tree Properties</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <h3 className="font-bold text-lg mb-2">Definition</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        A binary search tree is a binary tree where for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater.
                      </p>
                    </div>
                    
                    <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <h3 className="font-bold text-lg mb-2">Operations</h3>
                      <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>Search: O(log n) on average</li>
                        <li>Insert: O(log n) on average</li>
                        <li>Delete: O(log n) on average</li>
                        <li>Worst case: O(n) for unbalanced trees</li>
                      </ul>
                    </div>
                    
                    <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <h3 className="font-bold text-lg mb-2">Traversals</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        <strong>In-order:</strong> Left, Root, Right (sorted order)<br />
                        <strong>Pre-order:</strong> Root, Left, Right (copy tree)<br />
                        <strong>Post-order:</strong> Left, Right, Root (delete tree)
                      </p>
                    </div>
                    
                    <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <h3 className="font-bold text-lg mb-2">Applications</h3>
                      <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>Database indexing</li>
                        <li>Priority queues</li>
                        <li>Implementing associative arrays</li>
                        <li>Syntax trees in compilers</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Code Example */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-bold mb-3">Code Implementation</h2>
                  
                  <pre className={`p-4 rounded-lg overflow-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-100'} text-sm`} style={{ maxHeight: '200px' }}>
{`class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    
    const insertHelper = (node) => {
      if (value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertHelper(node.left);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertHelper(node.right);
        }
      }
    };
    
    insertHelper(this.root);
  }
  
  // More methods: search, delete, traversals...
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feynman Modal */}
      <FeynmanModal 
        isOpen={showFeynman}
        onClose={() => setShowFeynman(false)}
        topic={currentConcept?.title || category.name}
      />
      
      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 max-w-lg w-full`}
            >
              <h2 className="text-2xl font-bold mb-4">Quick Quiz</h2>
              
              <div className="mb-6">
                <p className="mb-4">What is the average time complexity for search operations in a balanced Binary Search Tree?</p>
                
                <div className="space-y-2">
                  {['O(1)', 'O(log n)', 'O(n)', 'O(n²)'].map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        quizAnswered ? 
                          option === 'O(log n)' ?
                            (isDarkMode ? 'bg-green-800 text-white' : 'bg-green-100 border border-green-500 text-green-800') :
                            (quizCorrect ? '' : 
                              (option === quizCorrect ? 
                                (isDarkMode ? 'bg-green-800 text-white' : 'bg-green-100 border border-green-500 text-green-800') : 
                                (isDarkMode ? 'bg-red-900 text-white' : 'bg-red-100 border border-red-500 text-red-800'))) :
                          (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                      }`}
                      onClick={() => !quizAnswered && handleQuizAnswer(option === 'O(log n)', false)}
                      disabled={quizAnswered}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {quizAnswered && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    quizCorrect ? 
                      (isDarkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800') : 
                      (isDarkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                  }`}>
                    {quizCorrect ? 
                      'Correct! BST operations are typically O(log n) for balanced trees, as we can eliminate half the remaining nodes with each comparison.' : 
                      'Not quite. The correct answer is O(log n), as with each comparison we can eliminate half of the remaining nodes.'}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowQuiz(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Placeholder for required tracer creator if not in traceAlgorithm.js
const createTreeTracer = () => ({ init: () => {}, step: () => {}, end: () => {}, getSteps: () => [] });

export default BinarySearchTreeScene; 