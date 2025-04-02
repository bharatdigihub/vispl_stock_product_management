import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput
import { CIcon } from "@coreui/icons-react"; // Import CIcon
import { cilPencil, cilTrash } from "@coreui/icons"; // Import CoreUI icons

const UsersIndex = () => {
    const { users = [] } = usePage().props;

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Users</h1>
            <PrimaryButton
                as="a" // Use "a" instead of Link
                href="/users/create"
                padding="tw-px-4 tw-py-2" // Added padding
                className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0" // Added tw-px-4 and tw-py-2
            >
                Add User
            </PrimaryButton>
            <table className="tw-table-auto tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-mt-4">
                <thead className="tw-bg-gray-900 tw-text-white">
                    <tr>
                        <th className="tw-border tw-border-gray-300 tw-p-3 tw-text-left tw-font-medium">Name</th>
                        <th className="tw-border tw-border-gray-300 tw-p-3 tw-text-left tw-font-medium">Email</th>
                        <th className="tw-border tw-border-gray-300 tw-p-3 tw-text-left tw-font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="tw-border-b">
                            <td className="tw-border tw-border-gray-300 tw-p-3">{user.name}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-3">{user.email}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-3 tw-flex tw-gap-2">
                                <PrimaryButton
                                    as="a"
                                    href={`/users/${user.id}/edit`}
                                    className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                >
                                    <CIcon icon={cilPencil} size="sm" /> {/* Use CoreUI icon */}
                                </PrimaryButton>
                                <PrimaryButton
                                    as="a"
                                    method="delete"
                                    href={`/users/${user.id}`}
                                    className="tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                >
                                    <CIcon icon={cilTrash} size="sm" /> {/* Use CoreUI icon */}
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </GlobalLayout>
    );
};

export default UsersIndex;
