import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectInput from "../SelectInput"; // Replace SelectDropdown with SelectInput
import TextInput from "../TextInput"; // Import TextInput
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError
import PrimaryButton from "../PrimaryButton";
import FormLayout from "../../Layouts/FormLayout";
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
        <FormLayout>    
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Create User</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter name" // Added placeholder
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
                        placeholder="Enter email" // Added placeholder
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
                        placeholder="Enter password" // Added placeholder
                    />
                    <InputError message={errors.password} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Role" className="tw-mb-1" />
                    <SelectInput
                        options={roles}
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        placeholder="Select Role"
                        labelKey="name" // Assuming roles have a 'name' key
                        valueKey="id" // Assuming roles have an 'id' key
                    />
                    <InputError message={errors.role} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    <SelectInput
                        options={permissions}
                        value={data.permissions}
                        onChange={(e) =>
                            setData("permissions", Array.from(e.target.selectedOptions, (option) => option.value))
                        }
                        multiple
                        placeholder="Select Permissions"
                        labelKey="name" // Assuming permissions have a 'name' key
                        valueKey="id" // Assuming permissions have an 'id' key
                    />
                    <InputError message={errors.permissions} className="tw-mt-1" />
                </div>
               <PrimaryButton
                    type="submit"
                    padding="tw-px-4 tw-py-2" // Added padding
                    className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                    Create
                </PrimaryButton>
            </form>
            </FormLayout>
        </GlobalLayout>
    );
};

export default CreateUser;
