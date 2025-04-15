import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, usePage } from "@inertiajs/react"; // Import usePage for dynamic breadcrumb
import { CButton, CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import { useSidebar } from '../Contexts/SidebarContext'; // Import SidebarContext
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaBell, FaCommentAlt, FaCreditCard, FaList, FaLock, FaCog, FaTasks, FaBars, FaTimes } from "react-icons/fa"; // Import react-icons
import Dropdown from '../Components/Dropdown'; // Import Dropdown component

const Header = ({ currentPage }) => {
    const [permissions, setPermissions] = useState([]);
    const { sidebarState, toggleSidebar, isMobileView } = useSidebar(); // Use isMobileView from SidebarContext
    const { theme, toggleTheme } = useTheme(); // Use ThemeContext
    const { url } = usePage(); // Get the current URL from Inertia.js
    const breadcrumbPaths = url.split('/').filter(Boolean); // Split path into segments

    useEffect(() => {
        fetchPermissions();
    }, [sidebarState]); // Add sidebarState as a dependency

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('/api/user/permissions');
            setPermissions(response.data); // Set permissions from API response
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
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
                            {isMobileView && sidebarState === 'closed' ? <FaTimes /> : <FaBars />}
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
                                } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`}
                            >
                                {theme.mode === "dark" ? <FaSun /> : <FaMoon />}
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
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`}
                                    >
                                        <FaBell />
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-blue-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
                                            5
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
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`}
                                    >
                                        <FaCommentAlt />
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-green-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
                                            3
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="64" className="message-dropdown py-0 tw-shadow-lg tw-rounded-lg">
                                    <div className="tw-px-4 tw-py-2 tw-bg-green-500 tw-font-bold tw-text-sm tw-text-white">Unread Messages</div>
                                    <ul className="tw-max-h-64 tw-min-w-[300px] tw-overflow-y-auto tw-bg-white">
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-start">
                                            <FaCommentAlt className="tw-mr-2 tw-text-green-500 tw-mt-1" />
                                            <span className="tw-text-sm tw-text-gray-700">John Doe: "Hello, how are you?"</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-start">
                                            <FaCommentAlt className="tw-mr-2 tw-text-green-500 tw-mt-1" />
                                            <span className="tw-text-sm tw-text-gray-700">Jane Smith: "Meeting at 3 PM."</span>
                                        </li>
                                        <li className="tw-px-4 tw-py-2 hover:tw-bg-green-100 tw-cursor-pointer tw-flex tw-items-start">
                                            <FaCommentAlt className="tw-mr-2 tw-text-green-500 tw-mt-1" />
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
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        title="User Menu" // Tooltip
                                        className={`tw-px-2 tw-py-2 tw-border tw-rounded-full tw-transition-all tw-flex tw-items-center tw-justify-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-950 tw-border-gray-700 tw-text-gray-400 hover:tw-text-gray-100'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative tw-w-8 tw-h-8 sm:tw-w-8 sm:tw-h-8`}
                                    >
                                        <FaUser />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48" className="user-dropdown py-0">
                                    <div className="tw-px-4 tw-py-2 tw-bg-gray-200 tw-font-bold tw-text-sm tw-text-gray-500">Account</div>
                                    <Dropdown.Link href="/account" className='tw-flex tw-items-center '>
                                        <FaUser className="tw-mr-2" /> Account
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/updates" className='tw-flex tw-items-center '>
                                        <FaBell className="tw-mr-2" /> Updates 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/messages" className='tw-flex tw-items-center '>
                                        <FaCommentAlt className="tw-mr-2" /> Messages 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/tasks" className='tw-flex tw-items-center '>
                                        <FaTasks className="tw-mr-2" /> Tasks
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/comments" className='tw-flex tw-items-center '>
                                        <FaCommentAlt className="tw-mr-2" /> Comments 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    
                                    <div className="tw-px-4 tw-py-2 tw-font-bold tw-bg-gray-200 tw-text-sm tw-text-gray-500">Settings</div>
                                    <Dropdown.Link href="/profile" className='tw-flex tw-items-center '>
                                        <FaUser className="tw-mr-2" /> Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/settings" className='tw-flex tw-items-center '>
                                        <FaCog className="tw-mr-2" /> Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/payments" className='tw-flex tw-items-center '>
                                        <FaCreditCard className="tw-mr-2" /> Payments 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/projects" className='tw-flex tw-items-center '>
                                        <FaList className="tw-mr-2" /> Projects 
                                        <span className="tw-bg-indigo-400 tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-text-white tw-min-w-[20px] tw-min-h-[18px] ms-1 tw-text-[11px]">42</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/lock-account" className='tw-flex tw-items-center '>
                                        <FaLock className="tw-mr-2" /> Lock Account
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        as="button"
                                        onClick={handleLogout}
                                        className="tw-text-red-600 tw-font-semibold hover:tw-bg-red-100 tw-flex tw-items-center"
                                    >
                                        <FaSignOutAlt className="tw-mr-2" /> Logout
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
