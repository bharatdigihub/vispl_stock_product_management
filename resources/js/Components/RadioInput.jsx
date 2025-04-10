import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useTheme } from "../Contexts/ThemeContext";

export default forwardRef(function RadioInput(
    { id, name, value, label, onChange, className = "", isFocused = false, ...props },
    ref
) {
    const { theme } = useTheme();
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <label
            htmlFor={id}
            className={`radio-input-label ${className}`}
        >
            <input
                {...props}
                type="radio"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                ref={localRef}
                className="radio-input-hidden"
            />
            <span
                className={`radio-input-outer`}
                style={{
                    borderColor: theme.mode === "dark" ? theme.border.sidebarOuter : theme.border.sidebarInner,
                    backgroundColor: theme.mode === "dark" ? theme.inputBackground : theme.background,
                }}
            >
                <span
                    className="radio-input-inner"
                    style={{
                        backgroundColor: theme.mode === "dark" ? theme.primary.split(" ")[0] : theme.secondary.split(" ")[0],
                    }}
                ></span>
            </span>
            <span className={`${theme.text}`}>{label}</span>
        </label>
    );
});
