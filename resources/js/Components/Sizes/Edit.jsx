import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import InputLabel from "../InputLabel"; // Import InputLabel
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"; // Import TextInput
import SelectInput from "../SelectInput"; // Import SelectInput
import FormLayout from "../../Layouts/FormLayout";

const EditSize = ({ primaryunits, sizes, roles = [], permissions = [], routes, userRole, userPermissions }) => { // Accept userRole and userPermissions
    const { data, setData, patch, errors } = useForm({
        name: sizes[0].name,
        unitid: sizes[0].unitid,
        sizeid: sizes[0].id,
        unitname: sizes[0].unitname,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update); // Use the update route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <FormLayout>
                <form onSubmit={handleSubmit}>
                    <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Size</h1>
                    <div className="tw-mb-4">
                        <InputLabel value="Name" className="tw-mb-1" />
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="tw-w-full"
                            placeholder="Enter name" // Added placeholder
                        />
                        {errors.name && <div className="tw-text-red-500">{errors.name}</div>}
                        <TextInput
                            type="hidden"
                            value={data.sizeid}
                            onChange={(e) => setData("sizeid", e.target.value)}
                            className="tw-w-full"
                        />
                    </div>

                    <div className="tw-mb-4">
                        <InputLabel value="Select Unit" className="tw-mb-1 " />
                        <SelectInput
                            options={primaryunits}
                            value={data.unitid}
                            onChange={(e) => setData("unitid", e.target.value)}
                            placeholder="Select a unit"
                            labelKey="unitname"
                            valueKey="id"
                            ariaLabel="Select a unit"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        padding="tw-px-4 tw-py-2" // Added padding
                        className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                    >
                        Update
                    </PrimaryButton>
                </form>
            </FormLayout>
        </GlobalLayout>
    );
};

export default EditSize;
