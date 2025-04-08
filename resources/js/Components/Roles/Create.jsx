import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import TextInput from "../TextInput";
import Checkbox from "../Checkbox";
import InputLabel from "../InputLabel"; // Import InputLabel
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton

const RoleCreate = ({ modules }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("roles.store"));
    };

    return (
        <GlobalLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Add Role</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Role Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter role name" // Added placeholder
                    />
                    {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                </div>
                <div className="tw-my-4">
                    <InputLabel value="Permissions" className="tw-mb-1" />
                    {modules.map((module) => (
                        <div key={module.id} className="tw-mb-4">
                            <h3 className="tw-font-bold tw-mb-3 mt-3">{module.name}</h3>
                            {module.permissions.map((permission) => (
                                <label key={permission.id} className="tw-flex tw-items-center tw-space-x-2 mb-1">
                                    <Checkbox
                                        value={permission.id}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setData("permissions", e.target.checked
                                                ? [...data.permissions, value]
                                                : data.permissions.filter((id) => id !== value)
                                            );
                                        }}
                                    />
                                    <span>{permission.action}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <PrimaryButton
                    type="submit"
                    padding="tw-px-4 tw-py-2" // Added padding
                    className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                    Create
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default RoleCreate;
