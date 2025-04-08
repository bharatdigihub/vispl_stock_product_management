import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import PrimaryButton from "../PrimaryButton";
import SelectDropdown from "../SelectDropdown";
import Checkbox from "../Checkbox";
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError

const PermissionEdit = ({ permission, modules, routes }) => {
    const { data, setData, patch, errors } = useForm({
        module_id: permission.module_id,
        actions: permission.actions || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update);
    };

    return (
        <GlobalLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Permissions</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Module" className="tw-mb-1" />
                    <SelectDropdown
                        options={modules}
                        value={data.module_id}
                        onChange={(e) => setData("module_id", e.target.value)}
                        placeholder="Select Module"
                    />
                    <InputError message={errors.module_id} className="tw-mt-1" />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Actions" className="tw-mb-1" />
                    <div className="tw-flex tw-space-x-4">
                        {["view", "create", "edit", "delete"].map((action) => (
                            <label key={action} className="tw-flex tw-items-center tw-space-x-2">
                                <Checkbox
                                    value={action}
                                    checked={data.actions.includes(action)}
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
                    <InputError message={errors.actions} className="tw-mt-1" />
                </div>
                
                <PrimaryButton
                    type="submit"
                    padding="tw-px-4 tw-py-2" // Added padding
                    className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                Update
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default PermissionEdit;
