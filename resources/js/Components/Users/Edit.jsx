import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import InputLabel from "../InputLabel"; // Import InputLabel

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
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit User</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Name" className="tw-mb-1" />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Email" className="tw-mb-1" />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.email && <div className="tw-text-red-500">{errors.email}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Role" className="tw-mb-1" />
                    <SelectDropdown
                        options={roles}
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        placeholder="Select Role"
                    />
                    {errors.role && <div className="tw-text-red-500">{errors.role}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    <SelectDropdown
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
                    />
                    {errors.permissions && <div className="tw-text-red-500">{errors.permissions}</div>}
                </div>
                <button
                    type="submit"
                    className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded-lg hover:tw-bg-blue-700"
                >
                    Update
                </button>
            </form>
        </GlobalLayout>
    );
};

export default EditUser;
