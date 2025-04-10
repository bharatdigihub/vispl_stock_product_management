import React from "react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import { Link, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput
import { CIcon } from "@coreui/icons-react"; // Import CIcon
import { cilPencil, cilTrash } from "@coreui/icons"; // Import CoreUI icons
import { useTheme } from "@/Contexts/ThemeContext";
import InputLabel from "../InputLabel"; // Import InputLabel
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import Checkbox from "../Checkbox"; // Import Checkbox
import RadioInput from "../RadioInput"; // Import RadioInput component

const UsersIndex = () => {
    const { users = [] } = usePage().props;
    const { theme } = useTheme();
    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Users</h1>
            <PrimaryButton
                as="a" // Use "a" instead of Link
                href="/users/create"
                padding="tw-px-4 tw-py-2" // Added padding
                className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-3" // Added tw-px-4 and tw-py-2
            >
                Add User
            </PrimaryButton>
            <div className="tw-overflow-x-auto tw-mb-10">
                <table cellPadding={0} cellSpacing={0} className={`tw-table-fixed tw-w-full tw-border ${theme.border.sidebarOuter} tw-rounded-lg tw-shadow-sm`}>
                    <thead className="tw-bg-gray-900 tw-text-white">
                        <tr>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-48`}>Name</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium lg:tw-w-full tw-w-96`}>Email</th>
                            <th className={`tw-border ${theme.border.sidebarOuter} tw-p-3 tw-text-left tw-font-medium tw-w-28`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className={`tw-border-b ${theme.border.sidebarOuter}`}>
                                <td className={`tw-border tw-w-48 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{user.name}</td>
                                <td className={`tw-border lg:tw-w-full tw-w-96 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>{user.email}</td>
                                <td className={`tw-border tw-w-28 ${theme.border.sidebarOuter} tw-p-3 ${theme.mode === "dark" ? 'tw-bg-gray-900 tw-text-gray-100' : 'tw-bg-gray-100'}`}>
                                    <PrimaryButton
                                        as="a"
                                        href={`/users/${user.id}/edit`}
                                        className="tw-bg-yellow-500 hover:tw-bg-yellow-600 tw-mx-1 tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <CIcon icon={cilPencil} size="sm" /> {/* Use CoreUI icon */}
                                    </PrimaryButton>
                                    <PrimaryButton
                                        as="a"
                                        method="delete"
                                        href={`/users/${user.id}`}
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
            <div className={`tw-mt-5 tw-overflow-x-auto tw-p-6 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.mode === "dark" ? "tw-bg-gray-900" : theme.background} tw-shadow-md`}>
                <h2 className={`tw-text-xl tw-font-bold tw-mb-4 ${theme.text}`}>Form Design</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                    {/* Row 1 */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Name" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="text"
                            placeholder="Enter name"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Email" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="email"
                            placeholder="Enter email"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Row 2 */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Role" className={`tw-mb-2 ${theme.text}`} />
                        <SelectDropdown
                            options={[
                                { id: 1, name: "Admin" },
                                { id: 2, name: "User" },
                                { id: 3, name: "Guest" },
                            ]}
                            placeholder="Select role"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} tw-flex tw-items-center tw-gap-3`}>
                        <Checkbox id="activebox" className={`${theme.checkbox}`} />
                        <InputLabel for="activebox" value="Active" className={`tw-text-sm ${theme.text}`} />
                    </div>
                    {/* Row 3 */}
                    <div className={`tw-col-span-2 tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Description" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="textarea"
                            placeholder="Enter description"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text} tw-min-h-28`}
                        />
                    </div>
                    {/* Submit Button */}
                    <div className="tw-col-span-2 tw-flex tw-justify-end tw-p-4">
                        <PrimaryButton type="submit" className={`${theme.button} tw-py-2 tw-px-6 tw-rounded-md`}>
                            Submit
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className={`tw-mt-10 tw-overflow-x-auto tw-p-6 tw-border ${theme.border.sidebarOuter} tw-rounded-lg ${theme.mode === "dark" ? "tw-bg-gray-900" : theme.background} tw-shadow-md`}>
                <h2 className={`tw-text-xl tw-font-bold tw-mb-4 ${theme.text}`}>All Possible Input Fields</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                    {/* Text Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Text Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="text"
                            placeholder="Enter text"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Password Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Password Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="password"
                            placeholder="Enter password"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Email Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Email Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="email"
                            placeholder="Enter email"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Number Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Number Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="number"
                            placeholder="Enter number"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Date Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Date Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="date"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* File Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="File Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="file"
                            className={`tw-mt-1 tw-py-1 tw-px-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Checkbox */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} tw-flex tw-items-center tw-gap-3`}>
                        <Checkbox id="checkbox" className={`${theme.checkbox}`} />
                        <InputLabel for="checkbox" value="Checkbox" className={`tw-text-sm ${theme.text}`} />
                    </div>
                    {/* Radio Button */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Radio Buttons" className={`tw-mb-2 ${theme.text}`} />
                        <div className="tw-flex tw-flex-col tw-gap-2">
                            <div className="radio-group-item tw-flex tw-items-center">
                                <TextInput
                                    type="radio"
                                    name="radioGroup"
                                    id="radio1"
                                    className={`tw-mr-2 tw-flex tw-rounded-full tw-max-w-4 tw-max-h-4 tw-min-w-4 tw-min-h-4 tw-p-0 ${theme.border.sidebarOuter}`}
                                />
                                <InputLabel for="radio1" value="Option 1" className={`${theme.text}`} />
                            </div>
                            <div className="radio-group-item tw-flex tw-items-center">
                                <TextInput
                                    type="radio"
                                    name="radioGroup"
                                    id="radio2"
                                    className={`tw-mr-2 tw-flex tw-rounded-full tw-max-w-4 tw-max-h-4 tw-min-w-4 tw-min-h-4 tw-p-0 ${theme.border.sidebarOuter}`}
                                />
                                <InputLabel for="radio2" value="Option 2" className={`${theme.text}`} />
                            </div>
                            <div className="radio-group-item tw-flex tw-items-center">
                                <TextInput
                                    type="radio"
                                    name="radioGroup"
                                    id="radio3"
                                    className={`tw-mr-2 tw-flex tw-rounded-full tw-max-w-4 tw-max-h-4 tw-min-w-4 tw-min-h-4 tw-p-0 ${theme.border.sidebarOuter}`}
                                />
                                <InputLabel for="radio3" value="Option 3" className={`${theme.text}`} />
                            </div>
                        </div>
                    </div>
                    {/* Select Dropdown */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Select Dropdown" className={`tw-mb-2 ${theme.text}`} />
                        <SelectDropdown
                            options={[
                                { id: 1, name: "Option 1" },
                                { id: 2, name: "Option 2" },
                                { id: 3, name: "Option 3" },
                            ]}
                            placeholder="Select an option"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Textarea */}
                    <div className={`tw-col-span-2 tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Textarea" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="textarea"
                            placeholder="Enter text"
                            className={`tw-mt-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text} tw-min-h-28`}
                        />
                    </div>
                     {/* Submit Button */}
                     <div className="tw-col-span-2 tw-flex tw-justify-end tw-p-4">
                        <PrimaryButton type="submit" className={`${theme.button} tw-py-2 tw-px-6 tw-rounded-md`}>
                            Submit
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className={`tw-mt-10 tw-overflow-x-auto tw-p-6 tw-border ${theme.border.sidebarOuter} tw-rounded-lg ${theme.mode === "dark" ? "tw-bg-gray-900" : theme.background} tw-shadow-md`}>
                <h2 className={`tw-text-xl tw-font-bold tw-mb-4 ${theme.text}`}>File Upload Designs</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                    {/* Design 1: Basic File Input */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Basic File Input" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="file"
                            className={`tw-mt-1 tw-py-1 tw-px-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                        />
                    </div>
                    {/* Design 2: Drag and Drop */}
                    <div className={`tw-p-4 tw-border-dashed tw-border-2 ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header} tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2`}>
                        <InputLabel value="Drag and Drop" className={`tw-mb-2 ${theme.text}`} />
                        <div className={`tw-w-full tw-h-32 tw-flex tw-items-center tw-justify-center ${theme.inputBackground} tw-border-2 tw-border-dashed ${theme.border.sidebarOuter} tw-rounded-md`}>
                            <p className={`tw-text-sm ${theme.text}`}>Drag files here or click to upload</p>
                        </div>
                        <TextInput
                            type="file"
                            className="tw-hidden"
                            id="drag-and-drop"
                        />
                        <label htmlFor="drag-and-drop" className={`tw-cursor-pointer tw-text-sm tw-font-medium tw-text-indigo-600 hover:tw-underline`}>
                            Browse Files
                        </label>
                    </div>
                    {/* Design 3: Button Trigger */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Button Trigger" className={`tw-mb-2 ${theme.text}`} />
                        <PrimaryButton
                            as="label"
                            htmlFor="button-trigger"
                            className={`${theme.button} tw-cursor-pointer`}
                        >
                            Upload File
                        </PrimaryButton>
                        <TextInput
                            type="file"
                            id="button-trigger"
                            className="tw-hidden"
                        />
                    </div>
                    {/* Design 4: Preview Uploaded File */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Preview Uploaded File" className={`tw-mb-2 ${theme.text}`} />
                        <TextInput
                            type="file"
                            id="file-preview"
                            className={`tw-mt-1 tw-py-1 tw-px-1 ${theme.border.sidebarOuter} ${theme.inputBackground} ${theme.text}`}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const preview = document.getElementById("file-preview-output");
                                if (file) {
                                    preview.textContent = `Selected File: ${file.name}`;
                                } else {
                                    preview.textContent = "No file selected";
                                }
                            }}
                        />
                        <p id="file-preview-output" className={`tw-mt-2 tw-text-sm ${theme.text}`}>No file selected</p>
                    </div>
                </div>
            </div>
            <div className={`tw-mt-10 tw-overflow-x-auto tw-p-6 tw-border ${theme.border.sidebarOuter} tw-rounded-lg ${theme.mode === "dark" ? "tw-bg-gray-900" : theme.background} tw-shadow-md`}>
                <h2 className={`tw-text-xl tw-font-bold tw-mb-4 ${theme.text}`}>Radio Option Designs</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                    {/* Design 1: Basic Radio Buttons */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Basic Radio Buttons" className={`tw-mb-2 ${theme.text}`} />
                        <div className="tw-flex tw-flex-col tw-gap-2">
                            <RadioInput
                                id="basicRadio1"
                                name="basicRadio"
                                value="option1"
                                label="Option 1"
                                className={`tw-mr-2`}
                            />
                            <RadioInput
                                id="basicRadio2"
                                name="basicRadio"
                                value="option2"
                                label="Option 2"
                                className={`tw-mr-2`}
                            />
                        </div>
                    </div>
                    {/* Design 2: Inline Radio Buttons */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Inline Radio Buttons" className={`tw-mb-2 ${theme.text}`} />
                        <div className="tw-flex tw-gap-4">
                            <RadioInput
                                id="inlineRadio1"
                                name="inlineRadio"
                                value="option1"
                                label="Option 1"
                                className={`tw-px-4 tw-py-2 tw-border ${theme.border.sidebarOuter} tw-rounded-full hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                            <RadioInput
                                id="inlineRadio2"
                                name="inlineRadio"
                                value="option2"
                                label="Option 2"
                                className={`tw-px-4 tw-py-2 tw-border ${theme.border.sidebarOuter} tw-rounded-full hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                        </div>
                    </div>
                    {/* Design 3: Card Style Radio Buttons */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Card Style Radio Buttons" className={`tw-mb-2 ${theme.text}`} />
                        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                            <RadioInput
                                id="cardRadio1"
                                name="cardRadio"
                                value="option1"
                                label="Option 1"
                                className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm tw-cursor-pointer hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                            <RadioInput
                                id="cardRadio2"
                                name="cardRadio"
                                value="option2"
                                label="Option 2"
                                className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm tw-cursor-pointer hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                        </div>
                    </div>
                    {/* Design 4: Toggle Style Radio Buttons */}
                    <div className={`tw-p-4 tw-border ${theme.border.sidebarOuter} tw-rounded-sm ${theme.header}`}>
                        <InputLabel value="Toggle Style Radio Buttons" className={`tw-mb-2 ${theme.text}`} />
                        <div className="tw-flex tw-gap-4">
                            <RadioInput
                                id="toggleRadio1"
                                name="toggleRadio"
                                value="option1"
                                label="Option 1"
                                className={`tw-px-4 tw-py-2 tw-border ${theme.border.sidebarOuter} tw-rounded-full hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                            <RadioInput
                                id="toggleRadio2"
                                name="toggleRadio"
                                value="option2"
                                label="Option 2"
                                className={`tw-px-4 tw-py-2 tw-border ${theme.border.sidebarOuter} tw-rounded-full hover:tw-bg-gray-100 ${theme.inputBackground}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`tw-mt-10 tw-overflow-x-auto tw-p-6 tw-border ${theme.border.sidebarOuter} tw-rounded-lg ${theme.mode === "dark" ? "tw-bg-gray-900" : theme.background} tw-shadow-md`}>
                <h2 className={`tw-text-xl tw-font-bold tw-mb-4 ${theme.text}`}>Button Variants</h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
                    {/* Small Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.button} tw-py-1 tw-px-3 tw-text-sm tw-rounded-md tw-shadow-md`}>
                            Small Button
                        </PrimaryButton>
                    </div>
                    {/* Medium Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.button} tw-py-2 tw-px-4 tw-text-base tw-rounded-md tw-shadow-md`}>
                            Medium Button
                        </PrimaryButton>
                    </div>
                    {/* Large Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.button} tw-py-3 tw-px-6 tw-text-lg tw-rounded-md tw-shadow-md`}>
                            Large Button
                        </PrimaryButton>
                    </div>
                    {/* Success Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.success} tw-py-2 tw-px-4 tw-text-base tw-rounded-md tw-shadow-md`}>
                            Success Button
                        </PrimaryButton>
                    </div>
                    {/* Warning Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.warning} tw-py-2 tw-px-4 tw-text-base tw-rounded-md tw-shadow-md`}>
                            Warning Button
                        </PrimaryButton>
                    </div>
                    {/* Danger Button */}
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <PrimaryButton className={`${theme.danger} tw-py-2 tw-px-4 tw-text-base tw-rounded-md tw-shadow-md`}>
                            Danger Button
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default UsersIndex;
