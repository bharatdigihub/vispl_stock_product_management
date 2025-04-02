import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import TextInput from "../TextInput"; // Import TextInput
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError

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
                    <InputLabel value="Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full"
                    />
                    <InputError message={errors.name} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Email" className="tw-mb-1" />
                    <TextInput
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="tw-w-full"
                    />
                    <InputError message={errors.email} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Password" className="tw-mb-1" />
                    <TextInput
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="tw-w-full"
                    />
                    <InputError message={errors.password} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Role" className="tw-mb-1" />
                    <SelectDropdown
                        options={roles}
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        placeholder="Select Role"
                    />
                    <InputError message={errors.role} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    <SelectDropdown
                        options={permissions}
                        value={data.permissions}
                        onChange={(e) =>
                            setData("permissions", Array.from(e.target.selectedOptions, (option) => option.value))
                        }
                        multiple
                        placeholder="Select Permissions"
                    />
                    <InputError message={errors.permissions} className="tw-mt-1" />
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
