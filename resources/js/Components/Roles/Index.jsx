import React from "react";
import { Link } from "@inertiajs/react";
import Header from "../Header"; // Import Header
import Footer from "../Footer"; // Import Footer

const RoleIndex = ({ roles, routes }) => {
    return (
        <>
            <Header /> {/* Include Header */}
            <main className="container mx-auto my-8">
                <h1 className="text-2xl font-bold mb-6">Roles</h1>

                {/* Button to navigate to the Add Role form */}
                <div className="mb-4">
                    <Link
                        href={routes.create}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Role
                    </Link>
                </div>

                {/* Table to display the list of roles */}
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
                                    {/* Edit button */}
                                    <Link
                                        href={routes.edit.replace(':id', role.id)} // Replace placeholder with role ID
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>

                                    {/* Delete button */}
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={routes.destroy.replace(':id', role.id)} // Replace placeholder with role ID
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                                    >
                                        Delete
                                    </Link>
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

export default RoleIndex;
