import { useTheme } from '../Contexts/ThemeContext';

export default function Checkbox({ className = '', ...props }) {
    const { theme } = useTheme();

    return (
        <input
            {...props}
            type="checkbox"
            className={
                `${theme.checkbox} ${theme.text} tw-rounded tw-shadow-sm ` +
                className
            }
        />
    );
}
