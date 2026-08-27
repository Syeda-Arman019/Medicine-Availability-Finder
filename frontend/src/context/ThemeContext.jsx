import React, { createContext, useContext, useState, useEffect } from "react";

// 1. ThemeContext ko EXPORT karna zaroori tha
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Directly initialize state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sync body class and localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
export const useTheme = () => useContext(ThemeContext);

// Default Export for safety
export default ThemeContext;