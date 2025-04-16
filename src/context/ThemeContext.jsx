import { createContext, useState, useContext, useEffect } from 'react';

// Create context with default values
export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('dsa-theme');
      return storedTheme ? JSON.parse(storedTheme) : true; // Default to dark mode
    } catch (error) {
      console.error('Error accessing theme from localStorage:', error);
      return true; // Default to dark mode on error
    }
  });

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and apply theme class when theme changes
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('dsa-theme', JSON.stringify(isDarkMode));
    
    // Apply appropriate class to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider; 