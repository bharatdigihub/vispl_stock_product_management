import React from "react";
import { CFormSelect } from "@coreui/react";
import { useTheme } from '../Contexts/ThemeContext';

const SelectDropdown = ({ options, value, onChange, multiple = false, placeholder = "Select an option", className = "" }) => {
    const { theme } = useTheme();

    return (
        <CFormSelect
            value={value}
            onChange={onChange}
            multiple={multiple}
            className={`tw-w-full tw-rounded-sm tw-min-h-10 ${theme.border.sidebarOuter} ${theme.text} ${theme.inputBackground} ${className}`}
        >
            {!multiple && <option value="">{placeholder}</option>}
            {options.map((option) => (
                <option key={option.id} value={option.name}>
                    {option.name}
                </option>
            ))}
        </CFormSelect>
    );
};

export default SelectDropdown;
