import { useState } from 'react';
import { motion } from 'framer-motion';
import codeHighlight from '../utils/codeHighlight';

const ConceptCard = ({ concept, themeColor = 'blue' }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Toggle section expansion
  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };
  
  // Format and syntax highlight code samples
  const formatCode = (code) => {
    if (!code) return '';
    
    // Basic syntax highlighting
    return codeHighlight(code);
  };
  
  if (!concept) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-gray-500">No concept data available.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Title and Description */}
      <div className={`bg-${themeColor}-600 px-6 py-5 text-white`}>
        <h2 className="text-xl font-bold">{concept.title}</h2>
        <p className="mt-1 text-${themeColor}-100">{concept.description}</p>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Key Insights */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Insights</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {concept.insights?.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </section>
        
        {/* Visual/Diagram */}
        {concept.visual && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Visual Representation</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-center">
                <img 
                  src={concept.visual} 
                  alt={concept.title + " visualization"} 
                  className="max-h-64 object-contain"
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Code Example */}
        {concept.code && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Code Example</h3>
            <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <pre dangerouslySetInnerHTML={{ __html: formatCode(concept.code) }}></pre>
            </div>
          </section>
        )}
        
        {/* Pros and Cons */}
        {(concept.pros?.length > 0 || concept.cons?.length > 0) && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Pros & Cons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Advantages</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {concept.pros?.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              {/* Cons */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Limitations</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {concept.cons?.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        
        {/* Common Patterns or Use Cases */}
        {concept.useCases?.length > 0 && (
          <section className="mb-6">
            <button
              className={`flex justify-between items-center w-full py-2 px-4 rounded-lg bg-${themeColor}-50 text-${themeColor}-800 hover:bg-${themeColor}-100 transition-colors`}
              onClick={() => toggleSection('useCases')}
            >
              <h3 className="text-lg font-semibold">Common Use Cases</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transform transition-transform ${expandedSection === 'useCases' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: expandedSection === 'useCases' ? 'auto' : 0,
                opacity: expandedSection === 'useCases' ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 px-2">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {concept.useCases?.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>
        )}
        
        {/* Performance Characteristics */}
        {concept.performance && (
          <section className="mb-6">
            <button
              className={`flex justify-between items-center w-full py-2 px-4 rounded-lg bg-${themeColor}-50 text-${themeColor}-800 hover:bg-${themeColor}-100 transition-colors`}
              onClick={() => toggleSection('performance')}
            >
              <h3 className="text-lg font-semibold">Performance Characteristics</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transform transition-transform ${expandedSection === 'performance' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: expandedSection === 'performance' ? 'auto' : 0,
                opacity: expandedSection === 'performance' ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 px-2">
                <div className="grid grid-cols-2 gap-3">
                  {concept.performance.timeComplexity && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-1">Time Complexity</h4>
                      <p className="text-gray-900 font-mono">{concept.performance.timeComplexity}</p>
                    </div>
                  )}
                  
                  {concept.performance.spaceComplexity && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-1">Space Complexity</h4>
                      <p className="text-gray-900 font-mono">{concept.performance.spaceComplexity}</p>
                    </div>
                  )}
                </div>
                
                {concept.performance.notes && (
                  <div className="mt-3 text-gray-700">
                    <p>{concept.performance.notes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ConceptCard; 