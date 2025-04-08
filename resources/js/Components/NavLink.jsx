import { Link } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import { cilChevronBottom, cilChevronTop } from "@coreui/icons";
import { useState } from 'react';

export default function NavLink({
    href,
    active = false,
    icon = null,
    sidebarState = "full",
    theme = {},
    onClick = () => {},
    children,
}) {
    return (
        <Link
            href={href}
            className={`tw-flex tw-items-center tw-h-10 tw-py-2  focus-visible:tw-outline-0 tw-border tw-border-transparent tw-px-2 tw-rounded-sm mb-1 ${
                sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"
            } ${
                active
                    ? "tw-bg-indigo-600/30  tw-border-indigo-800 tw-text-gray-50"
                    : "hover:tw-bg-gray-800 tw-text-inherit"
            }`}
            onClick={onClick}
        >
            {icon && <CIcon icon={icon} className={` ${active ? "tw-text-gray-50" : "tw-text-gray-500" } ${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"} tw-text-lg`} />}
            {sidebarState === "full" && (
                <span className="tw-text-[13px] tw-tracking-wider tw-font-medium">{children}</span>
            )}
        </Link>
    );
}

export function DropdownMenu({
    label,
    icon = null,
    items = [],
    sidebarState = "full",
    theme = {},
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div>
            <div
                className={`tw-flex tw-items-center tw-h-10 tw-border tw-border-transparent tw-py-2 tw-px-2 tw-rounded-sm ${
                    sidebarState === "half" ? "tw-justify-center" : "tw-justify-between"
                } ${isDropdownOpen ? "tw-bg-indigo-600/30  tw-border-indigo-800 tw-text-gray-50" : "hover:tw-bg-gray-800"} tw-cursor-pointer`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="tw-flex tw-items-center">
                    {icon && <CIcon icon={icon} className={`tw-text-gray-500 ${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"} tw-text-lg`} />}
                    {sidebarState === "full" && <span className="tw-text-[13px] tw-tracking-wider tw-font-medium">{label}</span>}
                </div>
                {sidebarState === "full" && (
                    <CIcon
                        icon={isDropdownOpen ? cilChevronTop : cilChevronBottom}
                        className={`tw-text-lg ${isDropdownOpen ? "tw-text-gray-50" : "tw-text-gray-500"}`}
                    />
                )}
            </div>
            {isDropdownOpen && sidebarState !== "half" && (
                <ul className="tw-ml-3 tw-mt-1 tw-border-l-2 tw-border-indigo-900">
                    {items.map((item, index) => (
                        <li key={index} className="tw-ml-4">
                            <NavLink
                                href={item.href}
                                icon={item.icon}
                                active={item.active}
                                sidebarState={sidebarState}
                                theme={theme}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
