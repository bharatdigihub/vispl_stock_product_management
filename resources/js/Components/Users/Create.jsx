import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout

const CreateUser = ({ roles, permissions, routes }) => { // Accept routes as a prop
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store); // Use the store route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Create User</h1>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.email && <div className="tw-text-red-500">{errors.email}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    />
                    {errors.password && <div className="tw-text-red-500">{errors.password}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Role</label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.role && <div className="tw-text-red-500">{errors.role}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Permissions</label>
                    <select
                        multiple
                        value={data.permissions}
                        onChange={(e) =>
                            setData("permissions", Array.from(e.target.selectedOptions, (option) => option.value))
                        }
                        className="tw-w-full tw-border tw-px-4 tw-py-2"
                    >
                        {permissions.map((permission) => (
                            <option key={permission.id} value={permission.name}>
                                {permission.name}
                            </option>
                        ))}
                    </select>
                    {errors.permissions && <div className="tw-text-red-500">{errors.permissions}</div>}
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

export default CreateUser;
