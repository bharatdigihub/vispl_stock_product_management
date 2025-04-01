import React, { useState, useEffect } from 'react';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('/api/users');
        setUsers(response.data);
    };

    return (
        <>
            <Header /> {/* Include Header */}
            <main className="container mx-auto my-8">
                <h1 className="text-2xl font-bold mb-6">User Management</h1>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer /> {/* Include Footer */}
        </>
    );
};

export default UserManagement;
