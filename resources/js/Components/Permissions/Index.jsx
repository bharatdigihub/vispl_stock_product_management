import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link } from "@inertiajs/react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

const PermissionIndex = ({ permissions, routes }) => {
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Permissions</h1>
            <div className="tw-mb-4">
                <Link
                    href={routes.create}
                    className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-600"
                >
                    Add Permission
                </Link>
            </div>
            <table className="tw-table-auto tw-w-full tw-border-collapse tw-border tw-border-gray-300">
                <thead>
                    <tr>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Name</th>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map((permission) => (
                        <tr key={permission.id}>
                            <td className="tw-border tw-border-gray-300 tw-p-2">{permission.name}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-2">
                                <Link
                                    href={routes.edit.replace(':id', permission.id)}
                                    className="tw-bg-yellow-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={routes.destroy.replace(':id', permission.id)}
                                    className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-red-600 tw-ml-2"
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

export default PermissionIndex;
