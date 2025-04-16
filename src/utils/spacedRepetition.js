// Constants for the spaced repetition system
const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Define initial intervals for each difficulty level (in days)
const INITIAL_INTERVALS = {
  [DIFFICULTY_LEVELS.EASY]: 3,
  [DIFFICULTY_LEVELS.MEDIUM]: 2,
  [DIFFICULTY_LEVELS.HARD]: 1
};

// Define multipliers for each review result
const REVIEW_MULTIPLIERS = {
  AGAIN: 0.5,  // If the user failed to recall
  HARD: 1.2,   // If the user found it difficult
  GOOD: 1.8,   // If the user recalled it correctly
  EASY: 2.5    // If the user found it very easy
};

/**
 * Calculate the next review date based on current interval and review quality
 * @param {number} currentInterval - Current interval in days
 * @param {string} reviewQuality - One of: 'AGAIN', 'HARD', 'GOOD', 'EASY'
 * @returns {number} - New interval in days
 */
export const calculateNextInterval = (currentInterval, reviewQuality) => {
  const multiplier = REVIEW_MULTIPLIERS[reviewQuality] || REVIEW_MULTIPLIERS.AGAIN;
  const newInterval = Math.max(1, Math.round(currentInterval * multiplier));
  return newInterval;
};

/**
 * Get the next review date
 * @param {number} interval - Interval in days
 * @returns {Date} - Date for next review
 */
export const getNextReviewDate = (interval) => {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
};

/**
 * Initialize a new card for spacing
 * @param {string} cardId - Unique ID of the card
 * @param {string} difficulty - Difficulty level of the card
 * @returns {Object} - Card spacing info
 */
export const initializeCard = (cardId, difficulty = DIFFICULTY_LEVELS.MEDIUM) => {
  const initialInterval = INITIAL_INTERVALS[difficulty] || INITIAL_INTERVALS[DIFFICULTY_LEVELS.MEDIUM];
  
  return {
    cardId,
    interval: initialInterval,
    lastReviewed: new Date(),
    nextReview: getNextReviewDate(initialInterval),
    reviewCount: 0,
    difficulty
  };
};

/**
 * Update card after review
 * @param {Object} cardSpacingInfo - Current spacing info for the card
 * @param {string} reviewQuality - Quality of the review
 * @returns {Object} - Updated card spacing info
 */
export const updateCardAfterReview = (cardSpacingInfo, reviewQuality) => {
  const newInterval = calculateNextInterval(cardSpacingInfo.interval, reviewQuality);
  const now = new Date();
  
  return {
    ...cardSpacingInfo,
    interval: newInterval,
    lastReviewed: now,
    nextReview: getNextReviewDate(newInterval),
    reviewCount: cardSpacingInfo.reviewCount + 1
  };
};

/**
 * Get cards due for review
 * @param {Array} cards - Array of card spacing info objects
 * @returns {Array} - Cards due for review
 */
export const getDueCards = (cards) => {
  const now = new Date();
  return cards.filter(card => card.nextReview <= now);
};