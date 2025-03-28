import React from "react";
import { useForm } from "@inertiajs/react";
import Header from "../Header"; // Import Header component
import Footer from "../Footer"; // Import Footer component

const CreateUser = () => {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/users");
    };

    return (
        <>
            <Header /> {/* Include Header */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create User</h1>
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
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full border px-4 py-2"
                    />
                    {errors.password && <div className="text-red-500">{errors.password}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="w-full border px-4 py-2"
                    >
                        <option value="">Select Role</option>
                        {/* Add role options dynamically */}
                    </select>
                    {errors.role && <div className="text-red-500">{errors.role}</div>}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Create
                </button>
            </form>
            <Footer /> {/* Include Footer */}
        </>
    );
};

export default CreateUser;
