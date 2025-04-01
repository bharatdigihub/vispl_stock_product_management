import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link } from "@inertiajs/react";

const RoleIndex = ({ roles, routes }) => {
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="text-2xl font-bold mb-6">Roles</h1>
            <div className="mb-4">
                <Link
                    href={routes.create}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Role
                </Link>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td className="border border-gray-300 p-2">{role.name}</td>
                            <td className="border border-gray-300 p-2">
                                <Link
                                    href={routes.edit.replace(':id', role.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={routes.destroy.replace(':id', role.id)}
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

export default RoleIndex;
