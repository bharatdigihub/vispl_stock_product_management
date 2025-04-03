import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import { CIcon } from "@coreui/icons-react"; // Import CIcon
import { cilPencil, cilTrash } from "@coreui/icons"; // Import CoreUI icons
import { useTheme } from "@/Contexts/ThemeContext";

const PermissionIndex = ({ permissions, routes }) => {
    const { theme } = useTheme();
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Permissions</h1>
            <div className="tw-mb-4">
                <PrimaryButton
                    as="Link"
                    href={routes.create}
                    padding="tw-px-4 tw-py-2" // Added padding
                className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                    Add Permission
                </PrimaryButton>
            </div>
            <div className="tw-overflow-x-auto">
                <table className={`tw-table-fixed tw-w-full tw-border ${theme.border.sidebarInner}`}>
                    <thead className="tw-bg-gray-900 tw-text-white">
                        <tr>
                            <th className={`tw-border  ${theme.border.sidebarInner} tw-p-3 tw-text-left tw-font-medium`}>Name</th>
                            <th className={`tw-border tw-min-w-40 tw-w-28 ${theme.border.sidebarInner} tw-p-3 tw-text-left tw-font-medium tw-max-w-20`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission) => (
                            <tr key={permission.id} className={`tw-border-b ${theme.border.sidebarInner}`}>
                                <td className={`tw-border  ${theme.border.sidebarInner} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{permission.name}</td>
                                <td className={`tw-border tw-min-w-40 tw-w-28 ${theme.border.sidebarInner} tw-p-3 tw-max-w-20 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>
                                    <PrimaryButton
                                        as="Link"
                                        href={routes.edit.replace(':id', permission.id)}
                                        className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-mx-1 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <CIcon icon={cilPencil} size="sm" /> {/* Use CoreUI icon */}
                                    </PrimaryButton>
                                    <PrimaryButton
                                        as="Link"
                                        method="delete"
                                        href={routes.destroy.replace(':id', permission.id)}
                                        className="tw-bg-red-500 hover:tw-bg-red-600 tw-mx-1 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <CIcon icon={cilTrash} size="sm" /> {/* Use CoreUI icon */}
                                    </PrimaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlobalLayout>
    );
};

export default PermissionIndex;
