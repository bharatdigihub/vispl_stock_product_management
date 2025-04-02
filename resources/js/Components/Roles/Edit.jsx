import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput

const RoleEdit = ({ role, modules, rolePermissions, routes }) => {
    const { data, setData, patch, errors } = useForm({
        name: role.name,
        permissions: rolePermissions || [], // Pre-select existing permissions
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update);
    };

    return (
        <GlobalLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Role</h1>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Role Name</label>
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Permissions</label>
                    {modules.map((module) => (
                        <div key={module.id} className="tw-mb-4">
                            <h3 className="tw-font-bold">{module.name}</h3>
                            {module.permissions.map((permission) => (
                                <label key={permission.id} className="tw-block">
                                    <input
                                        type="checkbox"
                                        value={permission.id}
                                        checked={data.permissions.includes(permission.id)}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setData("permissions", e.target.checked
                                                ? [...data.permissions, value]
                                                : data.permissions.filter((id) => id !== value)
                                            );
                                        }}
                                    />
                                    {permission.action}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <PrimaryButton
                    type="submit"
                    className="tw-bg-blue-500 hover:tw-bg-blue-700"
                >
                    Update
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default RoleEdit;
