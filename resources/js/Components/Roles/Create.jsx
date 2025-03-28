import React from "react";
import { useForm } from "@inertiajs/react";

const RoleCreate = () => {
    // Form state and methods for handling form submission
    const { data, setData, post, errors } = useForm({
        name: "", // Initial value for the role name
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("roles.store")); // Submit the form to the backend
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-6">Add Role</h1>

            {/* Form to create a new role */}
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
                    Create
                </button>
            </form>
        </div>
    );
};

export default RoleCreate;
