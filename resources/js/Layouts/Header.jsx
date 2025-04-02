import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "@inertiajs/react";
import { CButton, CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useTheme } from '../Contexts/ThemeContext'; // Import ThemeContext
import { CIcon } from '@coreui/icons-react';
import { cilMoon, cilSun } from '@coreui/icons';

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
        <>
            <header className={`tw-border-b tw-p-4 ${theme.background} ${theme.text} ${theme.border}`}>
                <nav className="tw-container tw-w-100 tw-max-w-full tw-flex tw-justify-between tw-items-center">
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <CButton
                            onClick={toggleSidebar}
                            className={`tw-border tw-rounded tw-px-3 tw-py-2 ${theme.button}`}
                        >
                            ☰
                        </CButton>
                        <h1 className="tw-text-xl tw-font-bold">{currentPage || "Admin Panel"}</h1>
                    </div>
                    <ul className="tw-flex tw-space-x-4 tw-items-center">
                        {permissions.includes('view dashboard') && (
                            <li><a href="/dashboard" className="hover:tw-underline tw-text-sm">Dashboard</a></li>
                        )}
                        {permissions.includes('manage users') && (
                            <li><a href="/users" className="hover:tw-underline tw-text-sm">Users</a></li>
                        )}
                        {permissions.includes('assign roles') && (
                            <li><a href="/roles" className="hover:tw-underline tw-text-sm">Roles</a></li>
                        )}
                        {permissions.includes('update permissions') && (
                            <li><a href="/permissions" className="hover:tw-underline tw-text-sm">Permissions</a></li>
                        )}
                        {permissions.includes('create roles') && (
                            <li><Link href={route("roles.create")} className="hover:tw-underline tw-text-sm">Add Role</Link></li>
                        )}
                        <li>
                            <button onClick={handleLogout} className="hover:tw-underline tw-text-sm">Logout</button>
                        </li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className={`tw-px-2 tw-py-2 tw-rounded-full tw-flex tw-items-center ${
                                    theme.mode === "dark"
                                        ? 'tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600'
                                        : 'tw-bg-gray-200 tw-text-gray-800 hover:tw-bg-gray-300'
                                }`}
                            >
                                <CIcon icon={theme.mode === "dark" ? cilSun : cilMoon} />
                            </button>
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
        </>
    );
};

export default Header;
