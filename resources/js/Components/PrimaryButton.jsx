import { Link } from "@inertiajs/react";

export default function PrimaryButton({
    as = "button", // Default to "button"
    className = "",
    disabled,
    children,
    ...props
}) {
    const Component = as === "Link" ? Link : as; // Use Link if "as" is "Link", otherwise use the provided element type

    return (
        <Component
            {...props}
            className={
                `tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-transparent tw-bg-gray-800 tw-px-4 tw-py-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-widest tw-text-white tw-transition tw-duration-150 tw-ease-in-out hover:tw-bg-gray-700 focus:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 active:tw-bg-gray-900 ${
                    disabled && "tw-opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Component>
    );
}
