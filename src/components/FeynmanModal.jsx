import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProgress } from '../context/UserProgressContext';

const FeynmanModal = ({ isOpen, onClose, topic }) => {
  const [explanation, setExplanation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const textareaRef = useRef(null);
  const { userProgress, saveFeynmanExplanation } = useUserProgress();
  
  // Load explanation for current topic from context
  useEffect(() => {
    if (topic && userProgress.feynmanExplanations[topic]) {
      setExplanation(userProgress.feynmanExplanations[topic]);
    } else {
      setExplanation('');
    }
  }, [topic, userProgress.feynmanExplanations, isOpen]);
  
  // Focus the textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  
  const handleSave = () => {
    if (!topic || !explanation.trim()) return;
    
    setIsSaving(true);
    
    // Save explanation using context function
    saveFeynmanExplanation(topic, explanation.trim());
    
    // Visual feedback
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsSaving(false);
    }, 1500);
  };
  
  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };
  
  // Feynman tips to show randomly
  const feynmanTips = [
    "Use simple language - if you can't explain it simply, you don't understand it well enough.",
    "Imagine teaching this concept to a complete beginner.",
    "Focus on the why, not just the how.",
    "Use analogies and examples from everyday life.",
    "Identify gaps in your understanding - where are you getting stuck?",
    "Connect this concept to what you already know well."
  ];
  
  // Pick a random tip
  const randomTip = feynmanTips[Math.floor(Math.random() * feynmanTips.length)];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Feynman Technique</h2>
                <button
                  className="text-white hover:text-indigo-200 transition-colors"
                  onClick={onClose}
                  aria-label="Close Feynman explanation modal"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-indigo-100 mt-1">Explain "{topic}" in your own words</p>
            </div>
            
            {/* Body */}
            <div className="p-6">
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">💡</div>
                  <div>
                    <h3 className="font-medium text-indigo-800">Tip:</h3>
                    <p className="text-indigo-700 text-sm">{randomTip}</p>
                  </div>
                </div>
              </div>
              
              <textarea
                ref={textareaRef}
                className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Start explaining the concept here..."
                value={explanation}
                onChange={handleExplanationChange}
              ></textarea>
              
              <div className="text-sm text-gray-500 mt-2">
                Teaching others is one of the best ways to learn. Your explanation is saved locally on your device.
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
              <button
                className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center ${
                  isSaving ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleSave}
                disabled={isSaving}
                type="button"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : showSuccess ? (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  'Save Explanation'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeynmanModal; 