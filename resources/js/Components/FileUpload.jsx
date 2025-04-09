import React from "react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import { useTheme } from "../Contexts/ThemeContext";

const FileUpload = ({ design = "basic", id, label, onChange, className = "" }) => {
    const { theme } = useTheme();

    if (design === "drag-and-drop") {
        return (
            <div className={`tw-p-4 tw-border-dashed tw-border-2 ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 ${className}`}>
                <InputLabel value={label} className={`tw-mb-2 ${theme.text}`} />
                <div className={`tw-w-full tw-h-32 tw-flex tw-items-center tw-justify-center ${theme.inputBackground} tw-border-2 tw-border-dashed ${theme.border.sidebarOuter} tw-rounded-md`}>
                    <p className={`tw-text-sm ${theme.text}`}>Drag files here or click to upload</p>
                </div>
                <TextInput
                    type="file"
                    className="tw-hidden"
                    id={id}
                    onChange={onChange}
                />
                <label htmlFor={id} className={`tw-cursor-pointer tw-text-sm tw-font-medium tw-text-indigo-600 hover:tw-underline`}>
                    Browse Files
                </label>
            </div>
        );
    }

    if (design === "button-trigger") {
        return (
            <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} ${className}`}>
                <InputLabel value={label} className={`tw-mb-2 ${theme.text}`} />
                <PrimaryButton
                    as="label"
                    htmlFor={id}
                    className={`${theme.button} tw-cursor-pointer`}
                >
                    Upload File
                </PrimaryButton>
                <TextInput
                    type="file"
                    id={id}
                    className="tw-hidden"
                    onChange={onChange}
                />
            </div>
        );
    }

    if (design === "preview") {
        return (
            <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} ${className}`}>
                <InputLabel value={label} className={`tw-mb-2 ${theme.text}`} />
                <TextInput
                    type="file"
                    id={id}
                    className={`tw-mt-1 tw-py-1 tw-px-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                    onChange={onChange}
                />
                <p id={`${id}-preview`} className={`tw-mt-2 tw-text-sm ${theme.text}`}>No file selected</p>
            </div>
        );
    }

    // Default to basic design
    return (
        <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} ${className}`}>
            <InputLabel value={label} className={`tw-mb-2 ${theme.text}`} />
            <TextInput
                type="file"
                id={id}
                className={`tw-mt-1 tw-py-1 tw-px-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                onChange={onChange}
            />
        </div>
    );
};

export default FileUpload;
