import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectInput from "../SelectInput"; // Replace SelectDropdown with SelectInput
import InputLabel from "../InputLabel"; // Import InputLabel
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"; // Import TextInput
import FormLayout from "../../Layouts/FormLayout";
const EditUser = ({ user, roles = [], permissions = [], routes, userRole, userPermissions }) => { // Accept userRole and userPermissions
    const { data, setData, patch, errors } = useForm({
        name: user.name,
        email: user.email,
        role: userRole || "", // Pre-select the user's current role
        permissions: userPermissions || [], // Pre-select the user's current permissions
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update); // Use the update route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <FormLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit User</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter name" // Added placeholder
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Email" className="tw-mb-1" />
                    <TextInput
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter email" // Added placeholder
                    />
                    {errors.email && <div className="tw-text-red-500">{errors.email}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Role" className="tw-mb-1" />
                    <SelectInput
                        options={roles}
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        placeholder="Select Role"
                        labelKey="name" // Assuming roles have a 'name' key
                        valueKey="id" // Assuming roles have an 'id' key
                    />
                    {errors.role && <div className="tw-text-red-500">{errors.role}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    <SelectInput
                        options={permissions}
                        value={data.permissions}
                        onChange={(e) =>
                            setData(
                                "permissions",
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                        multiple
                        placeholder="Select Permissions"
                        labelKey="name" // Assuming permissions have a 'name' key
                        valueKey="id" // Assuming permissions have an 'id' key
                    />
                    {errors.permissions && <div className="tw-text-red-500">{errors.permissions}</div>}
                </div>
                <PrimaryButton
                    type="submit"
                    padding="tw-px-4 tw-py-2" // Added padding
                    className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                    Update
                </PrimaryButton>
            </form>
            </FormLayout>
        </GlobalLayout>
    );
};

export default EditUser;
