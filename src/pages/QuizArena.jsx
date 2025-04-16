import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import quizBank from '../data/quizBank.json';
import { useUserProgress } from '../context/UserProgressContext';

const QuizArena = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [energy, setEnergy] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const { addXp, saveQuizScore } = useUserProgress();

  // Group questions by topic and difficulty
  const topicGroups = {};
  quizBank.questions.forEach(question => {
    if (!topicGroups[question.topic]) {
      topicGroups[question.topic] = {
        easy: [],
        medium: [],
        hard: []
      };
    }
    topicGroups[question.topic][question.difficulty].push(question);
  });

  // Get unique topics
  const topics = Object.keys(topicGroups);

  useEffect(() => {
    loadQuiz();
  }, [selectedTopic, selectedDifficulty]);

  const loadQuiz = () => {
    if (!topicGroups[selectedTopic]) return;
    
    const questions = topicGroups[selectedTopic][selectedDifficulty];
    if (questions && questions.length > 0) {
      // Shuffle questions (pick 5)
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      
      setCurrentQuiz({
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        questions: selected
      });
      setQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      setLevelComplete(false);
      setEnergy(100);
    }
  };

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null || energy <= 0) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = currentQuiz.questions[questionIndex];
    const correct = answerIndex === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    
    if (correct) {
      const pointValue = 
        selectedDifficulty === 'easy' ? 10 : 
        selectedDifficulty === 'medium' ? 20 : 30;
      
      setScore(prevScore => prevScore + pointValue);
      setXp(prevXp => {
        const newXp = prevXp + pointValue;
        if (newXp >= level * 100) {
          setLevel(prevLevel => prevLevel + 1);
          return newXp - (level * 100);
        }
        return newXp;
      });
    } else {
      setEnergy(prevEnergy => Math.max(0, prevEnergy - 20));
    }
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (questionIndex < currentQuiz.questions.length - 1) {
      setQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      const quizId = `${currentQuiz.topic}-${currentQuiz.difficulty}`;
      saveQuizScore(quizId, score, currentQuiz.questions.length);
      setLevelComplete(true);
    }
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  if (!currentQuiz) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white bg-indigo-950">
        Loading quizzes...
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[questionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Quiz Arena
        </h1>
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-indigo-900/50 rounded-xl">
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm text-indigo-300">Energy</label>
            <div className="h-3 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${energy}%`, backgroundColor: energy < 30 ? '#ff4d4d' : '#4CAF50' }}
              ></div>
            </div>
          </div>
          
          <div className="font-bold text-lg flex flex-col justify-center gap-2">
            <div>Score: {score}</div>
            <div>Level: {level}</div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm text-indigo-300">XP: {xp}/{level * 100}</label>
            <div className="h-3 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-amber-400"
                style={{ width: `${(xp / (level * 100)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-indigo-300">Topic:</label>
            <select 
              value={selectedTopic} 
              onChange={handleTopicChange}
              className="bg-indigo-900/70 text-white border border-indigo-600 rounded-md px-3 py-2 text-sm cursor-pointer"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-indigo-300">Difficulty:</label>
            <select 
              value={selectedDifficulty} 
              onChange={handleDifficultyChange}
              className="bg-indigo-900/70 text-white border border-indigo-600 rounded-md px-3 py-2 text-sm cursor-pointer"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
      
      {levelComplete ? (
        <div className="w-full max-w-[600px] mx-auto my-8 bg-indigo-900/70 rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Level Complete!
          </h2>
          <div className="mb-8 p-4 bg-indigo-950/50 rounded-xl">
            <p className="my-2 text-lg">Score: {score}</p>
            <p className="my-2 text-lg">Energy Remaining: {energy}</p>
            <p className="my-2 text-lg">XP Earned: +{score}</p>
          </div>
          <button 
            className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all hover:from-indigo-500 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={loadQuiz}
          >
            Start New Quiz
          </button>
        </div>
      ) : energy <= 0 ? (
        <div className="w-full max-w-[600px] mx-auto my-8 bg-indigo-900/70 rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Energy Depleted!
          </h2>
          <p className="mb-8 text-lg">You've run out of energy. Take a break or try again!</p>
          <button 
            className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all hover:from-indigo-500 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={loadQuiz}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-[800px] mx-auto">
          <div className="self-start mb-4 text-sm text-indigo-300">
            Question {questionIndex + 1} of {currentQuiz.questions.length}
          </div>
          
          <div className="w-full bg-indigo-900/70 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-semibold mb-8 leading-relaxed">{currentQuestion.question}</h3>
            
            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center p-4 ${
                    selectedAnswer === index 
                      ? (isCorrect 
                          ? 'bg-green-500/20 border-green-500/50' 
                          : 'bg-red-500/20 border-red-500/50')
                      : 'bg-indigo-800/50 border-indigo-400/30 hover:bg-indigo-700/50 hover:border-indigo-400/50'
                  } border rounded-xl cursor-pointer transition-all`}
                  onClick={() => handleAnswerClick(index)}
                  whileHover={{ scale: selectedAnswer === null ? 1.03 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                >
                  <span className="flex justify-center items-center w-8 h-8 bg-indigo-400/30 rounded-full mr-4 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-base leading-relaxed">{option}</span>
                </motion.div>
              ))}
            </div>
            
            {showExplanation && (
              <div className="mt-8 p-6 bg-indigo-900/50 rounded-xl border-l-4 border-indigo-400">
                <h4 className="text-xl font-bold mb-3">{isCorrect ? "Correct!" : "Incorrect!"}</h4>
                <p className="text-indigo-200 mb-6 leading-relaxed">{currentQuestion.explanation}</p>
                <button 
                  className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all hover:from-indigo-500 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={handleNextQuestion}
                >
                  {questionIndex < currentQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizArena; 