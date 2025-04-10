import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useTheme } from '../Contexts/ThemeContext';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
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

    const baseClass = `${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text} tw-min-h-10 tw-py-0 tw-w-full tw-block tw-rounded-sm `;

    if (type === 'textarea') {
        return (
            <textarea
                {...props}
                className={baseClass + '' + className}
                ref={localRef}
            />
        );
    }

    return (
        <input
            {...props}
            type={type}
            className={baseClass + '' + className}
            ref={localRef}
        />
    );
});
