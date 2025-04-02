import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeColors = {
    light: {
        background: 'tw-bg-gray-100',
        text: 'tw-text-black',
        header: 'tw-bg-white tw-text-black',
        button: 'tw-bg-gray-800 tw-text-white hover:tw-bg-gray-700 focus:tw-bg-gray-700 active:tw-bg-gray-900',
        padding: 'tw-px-4 tw-py-2', // Define padding for light theme
        sidebar: 'tw-bg-gray-950', // Always gray-950
        sidebarText: 'tw-text-black',
        border:'tw-border-gray-300', // Define border color for light theme
    },
    dark: {
        background: 'tw-bg-gray-900',
        text: 'tw-text-white',
        header: 'tw-bg-indigo-900 tw-text-white',
        button: 'tw-bg-gray-600 tw-text-white hover:tw-bg-indigo-500 focus:tw-bg-indigo-500 active:tw-bg-gray-700',
        padding: 'tw-px-4 tw-py-2', // Define padding for dark theme
        sidebar: 'tw-bg-gray-950', // Always gray-950
        sidebarText: 'tw-text-white',
        border:'tw-border-gray-800', 
    },
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const theme = isDarkMode ? themeColors.dark : themeColors.light;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
