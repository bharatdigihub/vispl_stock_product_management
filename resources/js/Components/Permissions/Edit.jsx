import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import PrimaryButton from "../PrimaryButton"; // Import PrimaryButton
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown

const PermissionEdit = ({ permission, modules, routes }) => {
    const { data, setData, patch, errors } = useForm({
        module_id: permission.module_id,
        actions: permission.actions || [], // Pre-select existing actions
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
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Module</label>
                    <SelectDropdown
                        options={modules}
                        value={data.module_id}
                        onChange={(e) => setData("module_id", e.target.value)}
                        placeholder="Select Module"
                    />
                    {errors.module_id && <div className="tw-text-red-500">{errors.module_id}</div>}
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Actions</label>
                    <div className="tw-flex tw-space-x-4">
                        {["view", "create", "edit", "delete"].map((action) => (
                            <label key={action} className="tw-flex tw-items-center tw-space-x-2">
                                <input
                                    type="checkbox"
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
                    {errors.actions && <div className="tw-text-red-500">{errors.actions}</div>}
                </div>
                <PrimaryButton
                    type="submit"
                    className="tw-bg-blue-500 hover:tw-bg-blue-700"
                >
                    Update
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default PermissionEdit;
