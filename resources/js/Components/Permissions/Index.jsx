import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import { CIcon } from "@coreui/icons-react";
import { cilPencil, cilTrash } from "@coreui/icons";

const PermissionIndex = ({ permissions, routes }) => {
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Permissions</h1>
            <div className="tw-mb-4">
                <PrimaryButton
                    as="Link"
                    href={routes.create}
                    className="tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-px-4 tw-py-2"
                >
                    Add Permission
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
                    {permissions.map((permission) => (
                        <tr key={permission.id}>
                            <td className="tw-border tw-border-gray-300 tw-p-2">{permission.name}</td>
                            <td className="tw-border tw-border-gray-300 tw-p-2">
                                <PrimaryButton
                                    as="Link"
                                    href={routes.edit.replace(':id', permission.id)}
                                    className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-rounded-full tw-w-8 tw-h-8 tw-px-0.5 tw-py-0.5 flex tw-items-center tw-justify-center"
                                >
                                    <CIcon icon={cilPencil} />
                                </PrimaryButton>
                                <PrimaryButton
                                    as="Link"
                                    method="delete"
                                    href={routes.destroy.replace(':id', permission.id)}
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

export default PermissionIndex;
