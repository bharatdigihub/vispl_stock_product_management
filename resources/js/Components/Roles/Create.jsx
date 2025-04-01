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
                <h1 className="text-2xl font-bold mb-4">Add Role</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border px-4 py-2"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Permissions</label>
                    {modules.map((module) => (
                        <div key={module.id} className="mb-4">
                            <h3 className="font-bold">{module.name}</h3>
                            {module.permissions.map((permission) => (
                                <label key={permission.id} className="block">
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Create
                </button>
            </form>
        </GlobalLayout>
    );
};

export default RoleCreate;
