import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting and retrieving data from localStorage
 * @param {string} key - The localStorage key to use
 * @param {any} initialValue - The default value if no value exists in localStorage
 * @returns {Array} - [storedValue, setValue] tuple similar to useState
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue if nothing stored
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when the state changes
  useEffect(() => {
    try {
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

/**
 * Helper function to get a value directly from localStorage
 * @param {string} key - The localStorage key to retrieve
 * @param {any} defaultValue - The default value if key doesn't exist
 * @returns {any} - The retrieved value or defaultValue
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Helper function to set a value directly to localStorage
 * @param {string} key - The localStorage key to set
 * @param {any} value - The value to store
 * @returns {boolean} - Success or failure
 */
export const setToStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
    return false;
  }
};

export default useLocalStorage; 