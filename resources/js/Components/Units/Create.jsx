import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import TextInput from "../TextInput"; // Import TextInput
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError
import PrimaryButton from "../PrimaryButton";
import { Select } from "@headlessui/react";


const CreateUnit = ({ units,roles, permissions, routes }) => { 
    // const { units = [] } = usePage().props;// Accept routes as a prop
    const { data, setData, post, errors } = useForm({
        name: "",
        baseunitid: "0",
        unitrate: "",
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store); // Use the store route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Add New Unit</h1>
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
                    <InputLabel value="Select base Unit" className="tw-mb-1" />
                    <SelectDropdown
                        options={[
                            { id: "0", name: "Primary" },
                            ...units.map((unit) => ({ id: unit.id, name: unit.unitname })),
                        ]}
                        value={data.baseunitid}
                        onChange={(e) => setData("baseunitid", e.target.value)}
                        placeholder="Select Base Unit"
                    />
                </div>
                <div className="tw-mb-4">
                    <InputLabel value="Rate" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.unitrate}
                        onChange={(e) => setData("unitrate", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter unit rate in numerical value" // Added placeholder
                    />
                    
                </div>

                
                
                
              
               <PrimaryButton
                    type="submit"
                    padding="tw-px-4 tw-py-2" // Added padding
                    className="tw-mb-4 tw-bg-indigo-500 hover:tw-bg-indigo-600 mb-0"
                >
                    Save
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default CreateUnit;
