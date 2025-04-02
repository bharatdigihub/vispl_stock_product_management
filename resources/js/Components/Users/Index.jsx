import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput
import { CIcon } from "@coreui/icons-react";
import { cilPencil, cilTrash } from "@coreui/icons";

const UsersIndex = () => {
    const { users = [] } = usePage().props;

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Users</h1>
            <PrimaryButton
                as="a" // Use "a" instead of Link
                href="/users/create"
                className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-px-4 tw-py-2"
            >
                Add User
            </PrimaryButton>
            <table className="tw-table-auto tw-w-full tw-border-collapse tw-border tw-border-gray-300 tw-mt-4">
                <thead>
                    <tr>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Name</th>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Email</th>
                        <th className="tw-border tw-border-gray-300 tw-p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="tw-border tw-border-gray-300 tw-p-2">{user.name}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-2">{user.email}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-2">
                                <PrimaryButton
                                    as="a"
                                    href={`/users/${user.id}/edit`}
                                    className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-rounded-full tw-w-8 tw-h-8 tw-px-0.5 tw-py-0.5 flex tw-items-center tw-justify-center"
                                >
                                    <CIcon icon={cilPencil} />
                                </PrimaryButton>
                                <PrimaryButton
                                    as="a"
                                    method="delete"
                                    href={`/users/${user.id}`}
                                    className="tw-bg-red-500 hover:tw-bg-red-600 tw-ml-2 tw-rounded-full tw-w-8 tw-h-8 tw-px-0.5 tw-py-0.5 flex tw-items-center tw-justify-center"
                                >
                                    <CIcon icon={cilTrash} />
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
