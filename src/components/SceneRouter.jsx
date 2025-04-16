import { useParams, Navigate } from 'react-router-dom';
import RecursionScene from '../scenes/RecursionScene';
import GraphScene from '../scenes/GraphScene';
import SortingScene from '../scenes/SortingScene';
import DynamicProgrammingScene from '../scenes/DynamicProgrammingScene';
import BinarySearchTreeScene from '../scenes/BinarySearchTreeScene';

// Scene mapping object that maps route parameters to actual components
const sceneMap = {
  'recursion': RecursionScene,
  'graphs': GraphScene,
  'sorting': SortingScene,
  'dynamic-programming': DynamicProgrammingScene,
  'binary-search-tree': BinarySearchTreeScene,
  'trees': BinarySearchTreeScene
};

/**
 * SceneRouter dynamically renders the appropriate scene component based on the URL parameter
 * Handles missing scenes with a fallback redirect to home
 */
const SceneRouter = () => {
  const { sceneId } = useParams();
  
  // Find the matching scene component
  const SceneComponent = sceneMap[sceneId];
  
  // If scene doesn't exist, redirect to home
  if (!SceneComponent) {
    console.warn(`Scene "${sceneId}" not found, redirecting to home`);
    return <Navigate to="/" replace />;
  }
  
  // Render the matching scene component
  return <SceneComponent />;
};

export default SceneRouter; 