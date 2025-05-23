import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout

const PermissionCreate = ({ modules, routes }) => {
    const { data, setData, post, errors } = useForm({
        module_id: "",
        actions: [], // Allow multiple actions
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store);
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Add Permissions</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Module</label>
                    <select
                        value={data.module_id}
                        onChange={(e) => setData("module_id", e.target.value)}
                        className="w-full border px-4 py-2"
                    >
                        <option value="">Select Module</option>
                        {modules.map((module) => (
                            <option key={module.id} value={module.id}>
                                {module.name}
                            </option>
                        ))}
                    </select>
                    {errors.module_id && <div className="text-red-500">{errors.module_id}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Actions</label>
                    <div className="flex space-x-4">
                        {["view", "create", "edit", "delete"].map((action) => (
                            <label key={action} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={action}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setData("actions", e.target.checked
                                            ? [...data.actions, value]
                                            : data.actions.filter((a) => a !== value)
                                        );
                                    }}
                                />
                                <span>{action}</span>
                            </label>
                        ))}
                    </div>
                    {errors.actions && <div className="text-red-500">{errors.actions}</div>}
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

export default PermissionCreate;
