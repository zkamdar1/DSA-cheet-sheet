# DSA Galaxy Explorer

An interactive, visual-first, and game-like experience for learning Data Structures and Algorithms (DSA) concepts.

![DSA Galaxy Explorer](https://via.placeholder.com/1200x600/3949AB/FFFFFF?text=DSA+Galaxy+Explorer)

## 🎯 Purpose

DSA Galaxy Explorer provides an immersive learning experience for mastering LeetCode-style algorithms and data structures. Unlike traditional learning platforms, this application focuses on creating a discovery-based system that rewards curiosity and keeps users in a playful, focused flow.

## ✨ Key Features

- **Interactive Visual Navigation**: Explore DSA concepts through a zoomable, interactive galaxy map
- **Immersive Learning Scenes**: Dive into key topics like Recursion, Graphs, and Sorting with animated visualizations
- **Interactive Code Execution**: Step through algorithms and see their effects in real-time
- **Flashcards with Spaced Repetition**: Memorize key concepts effectively
- **Quiz Arena**: Test your knowledge with adaptive quizzes
- **Feynman Technique**: Explain concepts in your own words to reinforce understanding
- **Playground**: Experiment with code implementations in a sandbox environment

## 🧠 Learning Techniques

- **Microlearning**: Focus on one concept at a time
- **Progressive Disclosure**: Reveal advanced views after interaction
- **Spaced Repetition**: Review flashcards at optimal intervals
- **Feynman Reflection**: Reinforce understanding by explaining concepts
- **Immediate Feedback**: Visual responses to all interactions

## 📁 Project Structure

```
dsa-galaxy-explorer/
├── src/
│   ├── scenes/
│   │   ├── RecursionScene.jsx
│   │   ├── GraphScene.jsx
│   │   └── SortingScene.jsx
│   ├── components/
│   │   ├── VisualNavMap.jsx
│   │   ├── CodePlayer.jsx
│   │   ├── ConceptCard.jsx
│   │   ├── FlashcardSwipe.jsx
│   │   ├── QuizCard.jsx
│   │   └── FeynmanModal.jsx
│   ├── pages/
│   │   ├── GalaxyHome.jsx
│   │   ├── FlashcardDeck.jsx
│   │   ├── QuizArena.jsx
│   │   └── PlaygroundLab.jsx
│   ├── data/
│   │   ├── concepts.json
│   │   ├── flashcards.json
│   │   ├── quizBank.json
│   │   └── visualMap.json
│   ├── utils/
│   │   ├── spacedRepetition.js
│   │   ├── animationUtils.js
│   │   └── traceAlgorithm.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dsa-galaxy-explorer.git
   cd dsa-galaxy-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [React Router](https://reactrouter.com/) - Routing

## 📱 Responsive Design

DSA Galaxy Explorer is designed to work on devices of all sizes:

- **Desktop**: Optimal experience with full visualizations
- **Tablet**: Adjusted layouts maintain all functionality
- **Mobile**: Core features are accessible with touch-friendly interfaces

## 🔮 Future Enhancements

- Additional interactive scenes for more DSA topics
- Code execution environment for testing implementations
- User progress tracking and achievements
- Community features for sharing explanations
- Expanded quiz question bank

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
