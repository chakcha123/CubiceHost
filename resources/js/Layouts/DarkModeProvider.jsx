import React, {  useState, useEffect } from 'react';
import { createContext } from 'react';
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedValue = localStorage.getItem('darkMode');
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
