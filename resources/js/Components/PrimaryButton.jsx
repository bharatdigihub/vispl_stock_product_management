import { Link } from "@inertiajs/react";
import { useSidebar } from "../Contexts/SidebarContext"; // Import useSidebar

export default function PrimaryButton({
    as = "button", // Default to "button"
    className = "",
    disabled,
    children,
    padding = "tw-px-1 tw-py-1", // Default padding
    ...props
}) {
    const Component = as === "Link" ? Link : as; // Use Link if "as" is "Link", otherwise use the provided element type
    const { isMobileView, setSidebarState } = useSidebar(); // Destructure from useSidebar

    const handleClick = (e) => {
        if (props.onClick) props.onClick(e); // Call existing onClick if provided
        setSidebarState(isMobileView ? "closed" : "full"); // Close or set to full based on media query
    };

    return (
        <Component
            {...props}
            onClick={handleClick} // Attach the new click handler
            className={
                `tw-inline-flex tw-min-w-8 tw-items-center tw-rounded-sm tw-border tw-border-transparent tw-bg-gray-800 ${padding} tw-text-xs tw-font-semibold tw-uppercase tw-tracking-widest tw-text-white tw-transition tw-duration-150 tw-ease-in-out hover:tw-bg-gray-700 focus:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 active:tw-bg-gray-900 ${
                    disabled && "tw-opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Component>
    );
}
