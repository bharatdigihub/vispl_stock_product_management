import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";

const RoleCreate = ({ modules }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        permissions: [], // Store selected permissions
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("roles.store"));
    };

    return (
        <GlobalLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Add Role</h1>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Role Name</label>
                    <input
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
                <button
                    type="submit"
                    className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded-lg hover:tw-bg-blue-700"
                >
                    Create
                </button>
            </form>
        </GlobalLayout>
    );
};

export default RoleCreate;
