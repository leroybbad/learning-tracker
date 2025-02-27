import { useState, useEffect } from 'react';

/**
 * Custom hook for working with localStorage
 * @param {string} key - The key to store in localStorage
 * @param {any} initialValue - The initial value
 * @returns {Array} [storedValue, setValue] - The stored value and a function to update it
 */
const useLocalStorage = (key, initialValue) => {
  // Get stored value from localStorage
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    // This effect ensures we update the state if localStorage is modified from another tab
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue) || initialValue);
      }
    };

    // Listen for changes to this localStorage key
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;