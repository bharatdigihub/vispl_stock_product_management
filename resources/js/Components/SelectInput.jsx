import React from "react";
import { useTheme } from "../Contexts/ThemeContext";

const SelectInput = ({
    options = [],
    value,
    onChange,
    required = false,
    placeholder = "Select an option",
    className = "",
    labelKey = "unitname", // Key for the display text
    valueKey = "id", // Key for the value
    ariaLabel = "Select an option", // Accessibility label
}) => {
    const { theme } = useTheme();

    return (
        <select
            value={value}
            onChange={onChange}
            required={required}
            aria-label={ariaLabel}
            className={`tw-w-full tw-rounded-sm tw-border tw-p-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 ${theme.inputBackground} ${theme.border.sidebarOuter} ${theme.text} ${className}`}
        >
            <option value="" disabled className={theme.text}>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option[valueKey]} value={option[valueKey]} className={theme.text}>
                    {option[labelKey]}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;