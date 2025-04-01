import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "@inertiajs/react";

const Header = () => {
    const [permissions, setPermissions] = useState([]);

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
        <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <ul className="flex space-x-4">
                    {permissions.includes('view dashboard') && (
                        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                    )}
                    {permissions.includes('manage users') && (
                        <li><a href="/users" className="hover:underline">Users</a></li>
                    )}
                    {permissions.includes('assign roles') && (
                        <li><a href="/roles" className="hover:underline">Roles</a></li>
                    )}
                    {permissions.includes('update permissions') && (
                        <li><a href="/permissions" className="hover:underline">Permissions</a></li>
                    )}
                    {permissions.includes('create roles') && (
                        <li><Link href={route("roles.create")} className="hover:underline">Add Role</Link></li>
                    )}
                    <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
