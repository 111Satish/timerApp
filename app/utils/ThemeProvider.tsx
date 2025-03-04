import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

// Define light and dark mode colors
const lightColors = {
  primary: "#007bff",
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  textPrimary: "#333333",
  textSecondary: "#666666",
  border: "#e0e0e0",
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
};

const darkColors = {
  primary: "#0d6efd",
  background: "#121212",
  cardBackground: "#1e1e1e",
  textPrimary: "#ffffff",
  textSecondary: "#cccccc",
  border: "#333333",
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
};

// Create a context for the theme
const ThemeContext = createContext({
  isDarkMode: false,
  colors: lightColors,
  toggleTheme: () => {},
});

// Theme Provider component
export const ThemeProvider = ({ children }:any) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === "dark");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === "dark");
    });
    return () => subscription.remove();
  }, []);

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);