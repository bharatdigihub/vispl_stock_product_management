import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";

const UsersIndex = () => {
    const { users = [] } = usePage().props;

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <Link href="/users/create" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Add User
            </Link>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
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
                                <Link
                                    href={`/users/${user.id}/edit`}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={`/users/${user.id}`}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </GlobalLayout>
    );
};

export default UsersIndex;
