import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput
import { CIcon } from "@coreui/icons-react"; // Import CIcon
import { cilPencil, cilTrash } from "@coreui/icons"; // Import CoreUI icons
import { useTheme } from "@/Contexts/ThemeContext";

const SewerIndex = () => {
    const { sewers = [] } = usePage().props;
    const { theme } = useTheme();
    console.log("sewers", sewers);

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Sewer List</h1>
            <PrimaryButton
                as="a" // Use "a" instead of Link
                href="/sewer/create"
                padding="tw-px-4 tw-py-2" // Added padding
                className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0" // Added tw-px-4 and tw-py-2
            >
                Add New Sewer Group
            </PrimaryButton>
            <div className="tw-overflow-x-auto">
                <table cellPadding={0} cellSpacing={0} className={`tw-table-fixed tw-w-full tw-border ${theme.border.sidebarOuter} tw-rounded-lg tw-shadow-sm tw-mt-4`}>
                    <thead className="tw-bg-gray-900 tw-text-white">
                        <tr>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Team head</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Factory</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Production Unit</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Team Size</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Wages Rate</th>
                            
                           
                           
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-28`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sewers.map((sewer) => (
                            <tr key={sewer.id} className={`tw-border-b ${theme.border.sidebarOuter}`}>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{sewer.sewername}</td>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{sewer.housename}</td>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{sewer.productionunitname} </td>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{sewer.manpower} </td>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{sewer.unitprice}/ {sewer.unitname}</td>
                               
                               
                              
                                <td className={`tw-border tw-w-28 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>
                                    <PrimaryButton
                                        as="a"
                                        href="#"
                                        className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-mx-1 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <CIcon icon={cilPencil} size="sm" /> {/* Use CoreUI icon */}
                                    </PrimaryButton>
                                   
                                    <PrimaryButton
                                     as="a"
                                     href={`/sewer/${sewer.id}/delete`}
                                       
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

export default SewerIndex;
