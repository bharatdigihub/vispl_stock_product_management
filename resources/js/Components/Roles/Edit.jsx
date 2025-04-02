import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import TextInput from "../TextInput"; // Import TextInput
import Checkbox from "../Checkbox"; // Import Checkbox
import InputLabel from "../InputLabel"; // Import InputLabel

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
                    <InputLabel value="Role Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    {modules.map((module) => (
                        <div key={module.id} className="tw-mb-4">
                            <h3 className="tw-font-bold mb-2">{module.name}</h3>
                            <div className="tw-flex tw-flex-row tw-items-center tw-space-x-3">
                            {module.permissions.map((permission) => (
                                <label key={permission.id} className="tw-flex tw-items-center tw-space-x-2">
                                    <Checkbox
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
                                   <span>{permission.action}</span>
                                </label>
                            ))}
                            </div>
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
