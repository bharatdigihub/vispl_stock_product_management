import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import InputLabel from "../InputLabel"; // Import InputLabel
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"; // Import TextInput
import FormLayout from "../../Layouts/FormLayout";
const EditGsm = ({ gsms, roles = [], permissions = [], routes, userRole, userPermissions }) => { // Accept userRole and userPermissions
    const { data, setData, patch, errors } = useForm({
        name: gsms.name,
        gsmid:gsms.id,
       
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update); // Use the update route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <FormLayout>
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Gsm Size</h1>
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
                        value={data.gsmid}
                        onChange={(e) => setData("gsmid", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter name" // Added placeholder
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

export default EditGsm;
