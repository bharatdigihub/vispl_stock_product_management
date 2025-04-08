import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, usePage } from "@inertiajs/react"; // Import usePage for dynamic breadcrumb
import { CButton, CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import { useSidebar } from '../Contexts/SidebarContext'; // Import SidebarContext
import { CIcon } from '@coreui/icons-react';
import { cilMoon, cilSun, cilUser, cilAccountLogout, cilBell, cilCommentSquare, cilCreditCard, cilList, cilLockLocked, cilSettings, cilTask, cilHamburgerMenu, cilClearAll} from '@coreui/icons'; // Import user icon
import Dropdown from '../Components/Dropdown'; // Import Dropdown component

const Header = ({ currentPage }) => {
    const [permissions, setPermissions] = useState([]);
    const { sidebarState, toggleSidebar, isMobileView } = useSidebar(); // Use isMobileView from SidebarContext
    const { theme, toggleTheme } = useTheme(); // Use ThemeContext
    const { url } = usePage(); // Get the current URL from Inertia.js
    const breadcrumbPaths = url.split('/').filter(Boolean); // Split path into segments

    useEffect(() => {
        //console.log("Sidebar State:", sidebarState); // Debug sidebarState
        fetchPermissions();
    }, [sidebarState]); // Add sidebarState as a dependency

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('/api/user/permissions');
            setPermissions(response.data); // Set permissions from API response
        } catch (error) {
            //console.error('Failed to fetch permissions:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className={`head-${sidebarState}`}>
            <header className={`tw-h-[60px] tw-border-b ${theme.header} ${theme.border.sidebarOuter} tw-p-4 ${theme.text} dark:tw-bg-black`}>
                <nav className="tw-container tw-w-100 tw-max-w-full tw-flex tw-justify-between tw-items-center">
                    <div className="tw-flex tw-items-center tw-space-x-2 tw-max-w-[35%] md:tw-max-w-full">
                        <CButton
                            onClick={toggleSidebar}
                            title="Toggle Sidebar" // Tooltip
                            className={`tw-rounded-sm tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center  p-1 ${theme.header} ${theme.menutext} ${theme.border}`}
                        >
                            <CIcon width={30} icon={isMobileView && sidebarState === 'closed' ? cilClearAll : sidebarState === 'half' ? cilClearAll : cilHamburgerMenu} />
                        </CButton>
                        <h1 className="tw-text-md tw-font-bold tw-text-ellipsis tw-overflow-hidden">{currentPage || "Admin Panel"}</h1>
                    </div>
                    <ul className="tw-flex tw-space-x-3 sm:tw-space-x-4 tw-items-center">
                        {permissions.includes('view dashboard') && (
                            <li><a href="/dashboard" className="hover:tw-underline tw-text-sm tw-text-inherit">Dashboard</a></li>
                        )}
                        {permissions.includes('manage users') && (
                            <li><a href="/users" className="hover:tw-underline tw-text-sm tw-text-inherit">Users</a></li>
                        )}
                        {permissions.includes('assign roles') && (
                            <li><a href="/roles" className="hover:tw-underline tw-text-sm tw-text-inherit">Roles</a></li>
                        )}
                        {permissions.includes('update permissions') && (
                            <li><a href="/permissions" className="hover:tw-underline tw-text-sm tw-text-inherit">Permissions</a></li>
                        )}
                        {permissions.includes('create roles') && (
                            <li><Link href={route("roles.create")} className="hover:tw-underline tw-text-sm tw-text-inherit">Add Role</Link></li>
                        )}
                        <li>
                            <button
                                onClick={toggleTheme}
                                title="Toggle Theme" // Tooltip
                                className={`tw-px-2 tw-py-2 tw-border tw-rounded-full tw-transition-all tw-flex tw-items-center tw-justify-center ${
                                    theme.mode === "dark"
                                        ? 'tw-bg-gray-950 tw-border-gray-700 tw-text-gray-400 hover:tw-text-gray-100'
                                        : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`} // Larger size in desktop view
                            >
                                <CIcon icon={theme.mode === "dark" ? cilSun : cilMoon} className="tw-w-4 tw-h-4 sm:tw-w-6 sm:tw-h-6" /> {/* Adjust icon size */}
                            </button>
                        </li>
                        <li className="tw-relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        title="Notifications" // Tooltip
                                        className={`tw-px-2 tw-py-2 tw-border tw-rounded-full tw-transition-all tw-flex tw-items-center tw-justify-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-950 tw-border-gray-700 tw-text-gray-400 hover:tw-text-gray-100'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`} // Larger size in desktop view
                                    >
                                        <CIcon icon={cilBell} className="tw-w-4 tw-h-4 sm:tw-w-6 sm:tw-h-6" /> {/* Adjust icon size */}
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-blue-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
                                            5 {/* Example count */}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="64" className="notification-dropdown py-0 tw-shadow-lg tw-rounded-lg">
                                    <div className="tw-px-4 tw-py-2 tw-bg-indigo-500 tw-font-bold tw-text-sm tw-text-white">Notifications</div>
                                    <ul className="tw-max-h-64 tw-min-w-[300px] tw-overflow-y-auto tw-bg-white">
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-indigo-100 tw-cursor-pointer">
                                            <span className="tw-text-sm tw-text-gray-700">New user registered</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-indigo-100 tw-cursor-pointer">
                                            <span className="tw-text-sm tw-text-gray-700">Server maintenance scheduled</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-indigo-100 tw-cursor-pointer">
                                            <span className="tw-text-sm tw-text-gray-700">New comment on your post</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-indigo-100 tw-cursor-pointer">
                                            <span className="tw-text-sm tw-text-gray-700">Payment received</span>
                                        </li>
                                    </ul>
                                    <div className="tw-px-4 tw-py-2 tw-bg-indigo-500 tw-text-center tw-text-sm tw-text-white hover:tw-bg-indigo-600 tw-cursor-pointer">
                                        View All
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                        <li className="tw-relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        title="Messages" // Tooltip
                                        className={`tw-px-2 tw-py-2 tw-border tw-transition-all tw-rounded-full tw-flex tw-items-center tw-justify-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-950 tw-border-gray-700 tw-text-gray-400 hover:tw-text-gray-100'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`} // Larger size in desktop view
                                    >
                                        <CIcon icon={cilCommentSquare} className="tw-w-4 tw-h-4 sm:tw-w-6 sm:tw-h-6" /> {/* Adjust icon size */}
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-green-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
                                            3 {/* Example count */}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="64" className="message-dropdown py-0 tw-shadow-lg tw-rounded-lg">
                                    <div className="tw-px-4 tw-py-2 tw-bg-green-500 tw-font-bold tw-text-sm tw-text-white">Unread Messages</div>
                                    <ul className="tw-max-h-64 tw-min-w-[300px] tw-overflow-y-auto tw-bg-white">
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-center">
                                            <CIcon icon={cilCommentSquare} className="tw-mr-2 tw-text-green-500" />
                                            <span className="tw-text-sm tw-text-gray-700">John Doe: "Hello, how are you?"</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-center">
                                            <CIcon icon={cilCommentSquare} className="tw-mr-2 tw-text-green-500" />
                                            <span className="tw-text-sm tw-text-gray-700">Jane Smith: "Meeting at 3 PM."</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-center">
                                            <CIcon icon={cilCommentSquare} className="tw-mr-2 tw-text-green-500" />
                                            <span className="tw-text-sm tw-text-gray-700">Mark Lee: "Please review the document."</span>
                                        </li>
                                    </ul>
                                    <div className="tw-px-4 tw-py-2 tw-bg-green-500 tw-text-center tw-text-sm tw-text-white hover:tw-bg-green-600 tw-cursor-pointer">
                                        View All
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                        <li className={`tw-border-l ${theme.border.sidebarOuter} tw-h-6 tw-mx-2`}></li> {/* Separator */}
                        <li>
                            <Dropdown >
                                <Dropdown.Trigger>
                                    <button
                                        title="User Menu" // Tooltip
                                        className={`tw-px-2 tw-py-2 tw-border tw-rounded-full tw-transition-all tw-flex tw-items-center tw-justify-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-950 tw-border-gray-700 tw-text-gray-400 hover:tw-text-gray-100'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`} // Larger size in desktop view
                                    >
                                        <CIcon icon={cilUser} className="tw-w-4 tw-h-4 sm:tw-w-6 sm:tw-h-6" /> {/* Adjust icon size */}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48" className="user-dropdown py-0">
                                    <div className="tw-px-4 tw-py-2 tw-bg-gray-200 tw-font-bold tw-text-sm tw-text-gray-500">Account</div>
                                    <Dropdown.Link href="/account">
                                        <CIcon icon={cilUser} className="tw-mr-2" /> Account
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/updates">
                                        <CIcon icon={cilBell} className="tw-mr-2" /> Updates 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/messages">
                                        <CIcon icon={cilCommentSquare} className="tw-mr-2" /> Messages 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/tasks">
                                        <CIcon icon={cilTask} className="tw-mr-2" /> Tasks
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/comments">
                                        <CIcon icon={cilCommentSquare} className="tw-mr-2" /> Comments 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    
                                    <div className="tw-px-4 tw-py-2 tw-font-bold tw-bg-gray-200 tw-text-sm tw-text-gray-500">Settings</div>
                                    <Dropdown.Link href="/profile">
                                        <CIcon icon={cilUser} className="tw-mr-2" /> Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/settings">
                                        <CIcon icon={cilSettings} className="tw-mr-2" /> Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/payments">
                                        <CIcon icon={cilCreditCard} className="tw-mr-2" /> Payments 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/projects">
                                        <CIcon icon={cilList} className="tw-mr-2" /> Projects 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/lock-account">
                                        <CIcon icon={cilLockLocked} className="tw-mr-2" /> Lock Account
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        as="button"
                                        onClick={handleLogout}
                                        className="tw-text-red-600 tw-font-semibold hover:tw-bg-red-100"
                                    >
                                        <CIcon icon={cilAccountLogout} className="tw-mr-2" /> Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>
            <CBreadcrumb className={`tw-mb-0 tw-py-1 tw-px-4 tw-border-b tw-text-[12px] ${theme.border.sidebarOuter} ${theme.header} ${theme.text}`}>
                <CBreadcrumbItem>
                    <Link href="/" className={theme.text}>
                        Home
                    </Link>
                </CBreadcrumbItem>
                {breadcrumbPaths.map((path, index) => {
                    const isLast = index === breadcrumbPaths.length - 1;
                    const href = `/${breadcrumbPaths.slice(0, index + 1).join('/')}`;
                    return (
                        <CBreadcrumbItem key={index} active={isLast}>
                            {isLast ? (
                                <span className={theme.text}>
                                    {path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </span>
                            ) : (
                                <Link href={href} className={theme.text}>
                                    {path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </Link>
                            )}
                        </CBreadcrumbItem>
                    );
                })}
            </CBreadcrumb>
        </div>
    );
};

export default Header;
