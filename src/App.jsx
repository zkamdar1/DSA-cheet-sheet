import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GalaxyHome from './pages/GalaxyHome';
import LearningCapsule from './pages/LearningCapsule';
import FlashcardDeck from './pages/FlashcardDeck';
import QuizArena from './pages/QuizArena';
import PlaygroundLab from './pages/PlaygroundLab';
import JourneyMode from './pages/JourneyMode';
import SceneRouter from './components/SceneRouter';
import { ThemeProvider } from './context/ThemeContext';
import { UserProgressProvider } from './context/UserProgressContext';
import './App.css';

// Animation settings for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw",
    scale: 0.95
  },
  in: {
    opacity: 1,
    // x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    // x: "100vw",
    scale: 1.05
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

// Wrapper for page components to add motion
const MotionPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ position: 'absolute', width: '100%', height: '100%' }} // Restore absolute positioning
  >
    {children}
  </motion.div>
);

function AppRoutes() {
    const location = useLocation(); // Get location for AnimatePresence key
    return (
        <AnimatePresence mode='wait'> {/* Use wait mode for smoother exit/enter */} 
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MotionPage><GalaxyHome /></MotionPage>} />
            <Route path="/topic/:topicId" element={<MotionPage><LearningCapsule /></MotionPage>} />
            <Route path="/flashcards" element={<MotionPage><FlashcardDeck /></MotionPage>} />
            <Route path="/quiz" element={<MotionPage><QuizArena /></MotionPage>} />
            <Route path="/playground" element={<MotionPage><PlaygroundLab /></MotionPage>} />
            <Route path="/journey" element={<MotionPage><JourneyMode /></MotionPage>} />
            <Route path="/scene/:sceneId" element={<MotionPage><SceneRouter /></MotionPage>} />
          </Routes>
        </AnimatePresence>
    );
}

function App() {
  return (
    <ThemeProvider>
      <UserProgressProvider>
        <Router>
          {/* Ensure container takes full screen dimensions */}
          <div className="app-container relative min-h-screen w-screen h-screen overflow-hidden">
            <AppRoutes />
          </div>
        </Router>
      </UserProgressProvider>
    </ThemeProvider>
  );
}

export default App;
