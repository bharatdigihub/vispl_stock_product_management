import React from "react";
import { CFormSelect } from "@coreui/react";

const SelectDropdown = ({ options, value, onChange, multiple = false, placeholder = "Select an option", className = "" }) => {
    return (
        <CFormSelect
            value={value}
            onChange={onChange}
            multiple={multiple}
            className={`tw-w-full tw-border tw-px-4 tw-py-2 ${className}`}
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
