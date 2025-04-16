import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Simple reusable confetti effect
const ConfettiEffect = ({ isActive = false, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive, duration]);

  if (!isVisible) return null;

  const colors = ['#FCD34D', '#10B981', '#3B82F6', '#EC4899', '#F97316', '#8B5CF6'];

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden="true"
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            top: '-10%', // Start above the screen
            left: `${Math.random() * 100}%`
          }}
          initial={{
            opacity: 0,
            y: '-10vh', // Start slightly above viewport
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [1, 1, 0], // Fade in, stay, fade out
            y: '110vh', // Fall down below viewport
            x: [`${Math.random() * 10 - 5}vw`, `${Math.random() * 20 - 10}vw`], // Slight horizontal drift
            rotate: Math.random() * 720 + 360, // More rotation
          }}
          transition={{
            duration: Math.random() * 2 + 1.5, // Random duration
            ease: 'linear', 
            delay: Math.random() * 0.5 // Stagger start times
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect; 