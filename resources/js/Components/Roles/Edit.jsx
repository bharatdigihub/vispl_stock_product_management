import React from "react";
import { useForm } from "@inertiajs/react";

const RoleEdit = ({ role }) => {
    // Form state and methods for handling form submission
    const { data, setData, patch, errors } = useForm({
        name: role.name, // Pre-fill the form with the existing role name
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("roles.update", role.id)); // Submit the form to update the role
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-6">Edit Role</h1>

            {/* Form to edit an existing role */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)} // Update form state
                        className="w-full border px-4 py-2"
                    />
                    {/* Display validation error for the role name */}
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default RoleEdit;
