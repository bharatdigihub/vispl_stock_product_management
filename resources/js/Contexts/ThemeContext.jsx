import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeColors = {
    light: {
        background: 'tw-bg-gray-200',
        text: 'tw-text-black',
        button: 'tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600 focus:tw-bg-indigo-600 active:tw-bg-indigo-700',
        padding: 'tw-px-4 tw-py-2', 
        sidebar: 'tw-bg-gray-800 tw-border-r tw-border-gray-800', 
        menutext: 'tw-text-black',
        border: {
            sidebarInner : 'tw-border-gray-700',  
            sidebarOuter : 'tw-border-gray-300', 
        },
        header: 'tw-bg-white',
        inputBackground: 'tw-bg-white', // Add input background for light mode
        checkbox: 'tw-bg-white tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-500', // Add checkbox styles for light mode
        primary: 'tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 focus:tw-bg-blue-600 active:tw-bg-blue-700',
        secondary: 'tw-bg-green-500 tw-text-white hover:tw-bg-green-600 focus:tw-bg-green-600 active:tw-bg-green-700',
        success: 'tw-bg-green-500 tw-text-white hover:tw-bg-green-600 focus:tw-bg-green-600 active:tw-bg-green-700',
        warning: 'tw-bg-yellow-500 tw-text-white hover:tw-bg-yellow-600 focus:tw-bg-yellow-600 active:tw-bg-yellow-700',
        danger: 'tw-bg-red-500 tw-text-white hover:tw-bg-red-600 focus:tw-bg-red-600 active:tw-bg-red-700',
    },
    dark: {
        background: 'tw-bg-gray-950',
        text: 'tw-text-white',
        button: 'tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600 focus:tw-bg-indigo-600 active:tw-bg-indigo-700',
        padding: 'tw-px-4 tw-py-2', 
        sidebar: 'tw-bg-gray-950 tw-border-r tw-border-gray-800', 
        menutext: 'tw-text-white',
        border: {
            sidebarInner : 'tw-border-gray-800',  
            sidebarOuter : 'tw-border-gray-800', 
        } ,
        header: 'tw-bg-gray-950',
        inputBackground: 'tw-bg-gray-800', // Add input background for dark mode
        checkbox: 'tw-bg-gray-800 tw-border-gray-600 tw-text-indigo-400 focus:tw-ring-indigo-500', // Add checkbox styles for dark mode
        primary: 'tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600 focus:tw-bg-indigo-600 active:tw-bg-indigo-700',
        secondary: 'tw-bg-teal-500 tw-text-white hover:tw-bg-teal-600 focus:tw-bg-teal-600 active:tw-bg-teal-700',
        success: 'tw-bg-green-600 tw-text-white hover:tw-bg-green-700 focus:tw-bg-green-700 active:tw-bg-green-800',
        warning: 'tw-bg-yellow-600 tw-text-white hover:tw-bg-yellow-700 focus:tw-bg-yellow-700 active:tw-bg-yellow-800',
        danger: 'tw-bg-red-600 tw-text-white hover:tw-bg-red-700 focus:tw-bg-red-700 active:tw-bg-red-800',
    },
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      );

      useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add("dark"); // Ensure the 'dark' class is added
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark"); // Ensure the 'dark' class is removed
          localStorage.setItem("theme", "light");
        }
      }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const theme = {
        ...isDarkMode ? themeColors.dark : themeColors.light,
        mode: isDarkMode ? 'dark' : 'light', // Add mode property
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
