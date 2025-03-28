import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Header from "../Header"; // Import Header component
import Footer from "../Footer"; // Import Footer component

const UsersIndex = () => {
    const { users = [] } = usePage().props;

    return (
        <>
            <Header /> {/* Include Header */}
            <div>
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <Link href="/users/create" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Add User
                </Link>
                <table className="min-w-full bg-white mt-4">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2">Name</th>
                            <th className="px-6 py-3 border-b-2">Email</th>
                            <th className="px-6 py-3 border-b-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-3">{user.name}</td>
                                <td className="px-6 py-3">{user.email}</td>
                                <td className="px-6 py-3">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/users/${user.id}`}
                                        method="delete"
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer /> {/* Include Footer */}
        </>
    );
};

export default UsersIndex;
