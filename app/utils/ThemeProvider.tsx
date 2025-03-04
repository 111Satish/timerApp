import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

// Define light and dark mode colors
const lightColors = {
    primary: "#4CAF50",
    background: "#FAFAFA",
    cardBackground: "#FFFFFF",
    textPrimary: "#212121",
    textSecondary: "#757575",
    border: "#E0E0E0",
    success: "#2E7D32",
    error: "#D32F2F",
    warning: "#FFA000",
    info: "#0288D1",
  };
  
  const darkColors = {
    primary: "#81C784",
    background: "#121212",
    cardBackground: "#1E1E1E",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0BEC5",
    border: "#424242",
    success: "#388E3C",
    error: "#E53935",
    warning: "#FFB300",
    info: "#29B6F6",
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