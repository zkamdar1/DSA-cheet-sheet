/**
 * Easing functions for animations
 */
export const easings = {
  // Linear easing
  linear: t => t,
  
  // Quadratic easing
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic easing
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Elastic easing
  easeOutElastic: t => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  }
};

/**
 * Animate a value from start to end
 * @param {Object} options - Animation options
 * @param {number} options.start - Starting value
 * @param {number} options.end - Ending value
 * @param {number} options.duration - Duration in milliseconds
 * @param {function} options.onUpdate - Callback with current value
 * @param {function} options.onComplete - Callback when animation completes
 * @param {function} options.easing - Easing function (t => value)
 * @returns {Object} - Animation controller with cancel method
 */
export const animateValue = ({
  start,
  end,
  duration = 300,
  onUpdate,
  onComplete,
  easing = easings.easeOutQuad
}) => {
  const startTime = Date.now();
  let animationFrameId = null;
  
  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const value = start + (end - start) * easedProgress;
    
    onUpdate(value);
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      if (onComplete) onComplete();
      animationFrameId = null;
    }
  };
  
  animationFrameId = requestAnimationFrame(animate);
  
  return {
    cancel: () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  };
};

/**
 * Simple spring physics simulation for animations
 * @param {Object} options - Spring options
 * @param {number} options.targetValue - Target value to reach
 * @param {number} options.initialValue - Starting value
 * @param {number} options.stiffness - Spring stiffness (0-1)
 * @param {number} options.damping - Spring damping (0-1)
 * @param {function} options.onUpdate - Callback with current value
 * @param {function} options.onComplete - Callback when spring settles
 * @param {number} options.threshold - Completion threshold
 * @returns {Object} - Spring controller with update and cancel methods
 */
export const createSpring = ({
  targetValue,
  initialValue = 0,
  stiffness = 0.1,
  damping = 0.8,
  onUpdate,
  onComplete,
  threshold = 0.001
}) => {
  let value = initialValue;
  let velocity = 0;
  let animationFrameId = null;
  
  const update = () => {
    // Calculate spring physics
    const distance = targetValue - value;
    const springForce = distance * stiffness;
    velocity += springForce;
    velocity *= damping;
    value += velocity;
    
    onUpdate(value);
    
    // Check if spring has settled
    if (Math.abs(velocity) < threshold && Math.abs(distance) < threshold) {
      if (onComplete) onComplete();
      value = targetValue;
      onUpdate(value);
      animationFrameId = null;
      return;
    }
    
    animationFrameId = requestAnimationFrame(update);
  };
  
  const start = () => {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(update);
    }
    return {
      cancel: () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      updateTarget: (newTarget) => {
        targetValue = newTarget;
        if (!animationFrameId) {
          start();
        }
      }
    };
  };
  
  return start();
};

/**
 * Create a sequence of animations
 * @param {Array} animations - Array of animation functions that return promises
 * @returns {Promise} - Promise that resolves when all animations complete
 */
export const sequence = async (animations) => {
  for (const animation of animations) {
    await animation();
  }
};

/**
 * Run multiple animations in parallel
 * @param {Array} animations - Array of animation functions that return promises
 * @returns {Promise} - Promise that resolves when all animations complete
 */
export const parallel = async (animations) => {
  await Promise.all(animations.map(animation => animation()));
};

/**
 * Create a transition between two states
 * @param {Object} options - Transition options
 * @param {function} options.from - Function that sets the initial state
 * @param {function} options.to - Function that sets the final state
 * @param {number} options.duration - Duration in milliseconds
 * @param {function} options.easing - Easing function (t => value)
 * @returns {Promise} - Promise that resolves when transition completes
 */
export const transition = ({ from, to, duration = 300, easing = easings.easeOutQuad }) => {
  return new Promise((resolve) => {
    from();
    animateValue({
      start: 0,
      end: 1,
      duration,
      easing,
      onUpdate: (progress) => {
        const setIntermediateState = (fromVal, toVal) => 
          fromVal + (toVal - fromVal) * progress;
          
        // For each property in from/to, interpolate between them
        // This is just a placeholder - in real use, you'd need to
        // implement more specific logic for your specific state types
      },
      onComplete: () => {
        to();
        resolve();
      }
    });
  });
}; 