import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "@inertiajs/react";
import { CButton, CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import { CIcon } from '@coreui/icons-react';
import { cilMoon, cilSun, cilUser, cilAccountLogout, cilBell, cilCommentSquare, cilCreditCard, cilList, cilLockLocked, cilSettings, cilTask } from '@coreui/icons'; // Import user icon
import Dropdown from '../Components/Dropdown'; // Import Dropdown component

const Header = ({ toggleSidebar, currentPage }) => {
    const [permissions, setPermissions] = useState([]);
    const { theme, toggleTheme } = useTheme(); // Use ThemeContext

    useEffect(() => {
        fetchPermissions();
    }, []);

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
        <div>
            <header className={`tw-h-[74px]  tw-border-b ${theme.border} tw-p-4 ${theme.background} ${theme.text} `}>
                <nav className="tw-container tw-w-100 tw-max-w-full tw-flex tw-justify-between tw-items-center">
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <CButton
                            onClick={toggleSidebar}
                            title="Toggle Sidebar" // Tooltip
                            className={`tw-rounded-full tw-px-3 tw-py-2 ${
                                theme.mode === "dark"
                                    ? 'tw-bg-indigo-700 tw-text-white hover:tw-bg-indigo-600'
                                    : 'tw-bg-indigo-200 tw-text-indigo-800 hover:tw-bg-indigo-300'
                            }`}
                        >
                            ☰
                        </CButton>
                        <h1 className="tw-text-xl tw-font-bold">{currentPage || "Admin Panel"}</h1>
                    </div>
                    <ul className="tw-flex tw-space-x-4 tw-items-center">
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
                                className={`tw-px-2 tw-py-2 tw-rounded-full tw-flex tw-items-center ${
                                    theme.mode === "dark"
                                        ? 'tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600'
                                        : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                }`}
                            >
                                <CIcon icon={theme.mode === "dark" ? cilSun : cilMoon} />
                            </button>
                        </li>
                        <li className="tw-relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        title="Notifications" // Tooltip
                                        className={`tw-px-2 tw-py-2 tw-rounded-full tw-flex tw-items-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative`} // Add relative positioning
                                    >
                                        <CIcon icon={cilBell} />
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
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
                                        className={`tw-px-2 tw-py-2 tw-rounded-full tw-flex tw-items-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        } tw-relative`} // Add relative positioning
                                    >
                                        <CIcon icon={cilCommentSquare} />
                                        <span className="tw-absolute -tw-top-2 -tw-right-2 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
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
                        <li className="tw-border-l tw-border-gray-300 tw-h-6 tw-mx-2"></li> {/* Separator */}
                        <li>
                            <Dropdown >
                                <Dropdown.Trigger>
                                    <button
                                        title="User Menu" // Tooltip
                                        className={`tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center ${
                                            theme.mode === "dark"
                                                ? 'tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600'
                                                : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                        }`}
                                    >
                                        <CIcon icon={cilUser} />
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
                                        <CIcon icon={cilTask} className="tw-mr-2" /> Tasks42
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
            <CBreadcrumb className={`tw-mt-2 tw-px-4 ${theme.text}`}>
                <CBreadcrumbItem href="/" className={theme.text}>
                    Home
                </CBreadcrumbItem>
                <CBreadcrumbItem active className={theme.text}>
                    {currentPage || "Admin Panel"}
                </CBreadcrumbItem>
            </CBreadcrumb>
        </div>
    );
};

export default Header;
