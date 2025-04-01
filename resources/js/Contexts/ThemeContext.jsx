import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeColors = {
    light: {
        background: 'tw-bg-gray-100',
        text: 'tw-text-black',
        header: 'tw-bg-white tw-text-black',
        button: 'tw-bg-blue-500 tw-text-white hover:tw-bg-indigo-600',
    },
    dark: {
        background: 'tw-bg-gray-900',
        text: 'tw-text-white',
        header: 'tw-bg-gray-800 tw-text-white',
        button: 'tw-bg-indigo-600 tw-text-white hover:tw-bg-blue-500',
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
