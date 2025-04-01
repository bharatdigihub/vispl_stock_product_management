import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";

const UsersIndex = () => {
    const { users = [] } = usePage().props;

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Users</h1>
            <Link href="/users/create" className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded-lg">
                Add User
            </Link>
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
                                <Link
                                    href={`/users/${user.id}/edit`}
                                    className="tw-bg-yellow-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={`/users/${user.id}`}
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

export default UsersIndex;
