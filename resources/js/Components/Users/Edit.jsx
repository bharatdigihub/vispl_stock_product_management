import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout

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
                <h1 className="text-2xl font-bold mb-4">Edit User</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border px-4 py-2"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border px-4 py-2"
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="w-full border px-4 py-2"
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.role && <div className="text-red-500">{errors.role}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Permissions</label>
                    <select
                        multiple
                        value={data.permissions}
                        onChange={(e) =>
                            setData(
                                "permissions",
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                        className="w-full border px-4 py-2"
                    >
                        {permissions.map((permission) => (
                            <option key={permission.id} value={permission.name}>
                                {permission.name}
                            </option>
                        ))}
                    </select>
                    {errors.permissions && <div className="text-red-500">{errors.permissions}</div>}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </GlobalLayout>
    );
};

export default EditUser;
