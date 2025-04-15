import React from 'react'
import { useTheme } from "../Contexts/ThemeContext";

const FormLayout = ({ children }) => {
    const { theme } = useTheme(); 
    return (
        <div className={`tw-p-4 tw-rounded-md tw-border ${theme.border.sidebarOuter} ${theme.header} ${theme.header}`}>
            {children}
        </div>
    )
}

export default FormLayout