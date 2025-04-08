import { useTheme } from '../Contexts/ThemeContext';

export default function InputError({ message, className = '', ...props }) {
    const { theme } = useTheme();

    return message ? (
        <p
            {...props}
            className={`tw-text-sm tw-text-red-600 ${theme.text} ` + className}
        >
            {message}
        </p>
    ) : null;
}
