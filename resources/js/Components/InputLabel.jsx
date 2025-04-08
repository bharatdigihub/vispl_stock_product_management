import { useTheme } from '../Contexts/ThemeContext';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    const { theme } = useTheme();

    return (
        <label
            {...props}
            className={`block text-sm font-medium ${theme.text} ` + className}
        >
            {value ? value : children}
        </label>
    );
}
