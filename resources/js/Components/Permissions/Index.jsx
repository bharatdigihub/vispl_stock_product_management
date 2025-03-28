import React from "react";
import { Link } from "@inertiajs/react";
import Header from "../Header";
import Footer from "../Footer";

const PermissionIndex = ({ permissions, routes }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto my-8">
                <h1 className="text-2xl font-bold mb-6">Permissions</h1>
                <div className="mb-4">
                    <Link
                        href={routes.create}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Permission
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
                        {permissions.map((permission) => (
                            <tr key={permission.id}>
                                <td className="border border-gray-300 p-2">{permission.name}</td>
                                <td className="border border-gray-300 p-2">
                                    <Link
                                        href={routes.edit.replace(':id', permission.id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={routes.destroy.replace(':id', permission.id)}
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
            <Footer />
        </>
    );
};

export default PermissionIndex;
