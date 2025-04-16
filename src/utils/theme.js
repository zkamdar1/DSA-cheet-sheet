/**
 * Utility functions for setting up Tailwind CSS with dark mode
 */

/**
 * Initialize the theme based on user preference or system preference
 * Should be called on application start
 */
export const initializeTheme = () => {
  // Check for theme preference in localStorage
  const storedTheme = localStorage.getItem('dsa-theme');
  
  // If we have a stored preference, use that
  if (storedTheme !== null) {
    const isDarkMode = JSON.parse(storedTheme);
    setThemeClass(isDarkMode);
    return;
  }
  
  // Otherwise, check for system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setThemeClass(true);
    localStorage.setItem('dsa-theme', JSON.stringify(true));
  } else {
    setThemeClass(false);
    localStorage.setItem('dsa-theme', JSON.stringify(false));
  }
};

/**
 * Set the appropriate class on the document element based on theme
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
export const setThemeClass = (isDarkMode) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Listen for system theme changes
 * @param {function} callback - Function to call when the theme changes
 */
export const watchSystemThemeChanges = (callback) => {
  if (!window.matchMedia) return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (e) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', listener);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', listener);
}; 