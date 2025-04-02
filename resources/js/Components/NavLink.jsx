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
            className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md mb-1 ${
                sidebarState === "half" ? "tw-justify-center" : "tw-justify-start"
            } ${
                active
                    ? "tw-bg-indigo-900 tw-text-white"
                    : "hover:tw-bg-gray-800 tw-text-inherit"
            }`}
            onClick={onClick}
        >
            {icon && <CIcon icon={icon} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"} tw-text-lg`} />}
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
                className={`tw-flex tw-items-center tw-h-10 tw-py-2 tw-px-2 tw-rounded-md ${
                    sidebarState === "half" ? "tw-justify-center" : "tw-justify-between"
                } ${isDropdownOpen ? "tw-bg-indigo-900 tw-text-white" : "hover:tw-bg-gray-800"} tw-cursor-pointer`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="tw-flex tw-items-center">
                    {icon && <CIcon icon={icon} className={`${sidebarState === "half" ? "tw-mr-0" : "tw-mr-2"} tw-text-lg`} />}
                    {sidebarState === "full" && <span className="tw-text-[13px] tw-tracking-wider tw-font-medium">{label}</span>}
                </div>
                {sidebarState === "full" && (
                    <CIcon
                        icon={isDropdownOpen ? cilChevronTop : cilChevronBottom}
                        className="tw-text-lg"
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
