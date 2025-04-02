import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import { Link } from "@inertiajs/react";

const RoleIndex = ({ roles, routes }) => {
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Roles</h1>
            <div className="tw-mb-4">
                <PrimaryButton
                    as="Link"
                    href={routes.create}
                    className="tw-bg-blue-500 hover:tw-bg-blue-600"
                >
                    Add Role
                </PrimaryButton>
            </div>
            <table className="tw-table-auto tw-w-full tw-border-collapse tw-border tw-border-gray-300">
                <thead>
                    <tr>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Name</th>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td className="tw-border tw-border-gray-300 tw-p-2">{role.name}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-2">
                                <PrimaryButton
                                    as="Link"
                                    href={routes.edit.replace(':id', role.id)}
                                    className="tw-bg-yellow-500 hover:tw-bg-yellow-600"
                                >
                                    Edit
                                </PrimaryButton>
                                <PrimaryButton
                                    as="Link"
                                    method="delete"
                                    href={routes.destroy.replace(':id', role.id)}
                                    className="tw-bg-red-500 hover:tw-bg-red-600 tw-ml-2"
                                >
                                    Delete
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </GlobalLayout>
    );
};

export default RoleIndex;
