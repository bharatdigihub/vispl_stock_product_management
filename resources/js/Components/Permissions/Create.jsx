import React from "react";
import { useForm } from "@inertiajs/react";
import Header from "../Header";
import Footer from "../Footer";

const PermissionCreate = () => {
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("permissions.store"));
    };

    return (
        <>
            <Header />
            <div className="container mx-auto my-8">
                <h1 className="text-2xl font-bold mb-6">Add Permission</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Permission Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border px-4 py-2"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default PermissionCreate;
