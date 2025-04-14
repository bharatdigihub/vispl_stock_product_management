import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import InputLabel from "../InputLabel"; // Import InputLabel
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"; // Import TextInput
import { Select } from "@headlessui/react";

const EditUnit = ({ primaryunits,units, roles = [], permissions = [], routes, userRole, userPermissions }) => { // Accept userRole and userPermissions
    const { data, setData, patch, errors } = useForm({
        name: units.unitname,
        unitid:units.id,
        baseunitid:units.baseunitid,
        unitrate:units.unitrate,
        baseunitname:units.parent_name,
       
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(routes.update); // Use the update route passed from the backend
    };
    console.log(units);

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Unit</h1>
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
                        value={data.unitid}
                        onChange={(e) => setData("unitid", e.target.value)}
                        className="tw-w-full"
                        placeholder="Enter name" // Added placeholder
                    />
                </div>

                 <div className="tw-mb-4">
                                <InputLabel value="Select base Unit" className="tw-mb-1" />
                                <Select className="ml-2"aria-label="Default select example"onChange={(e) => setData("baseunitid", e.target.value)}>
                                {data.baseunitid &&
                                    <option value="{data.baseunitid}">{data.baseunitname}</option>
                                }
                                    
                                
                      <option value="0">Primary</option>
                      {primaryunits.map((baseunit) => (
                        <option key={baseunit.id} value={baseunit.id}>
                          {baseunit.unitname}
                        </option>
                      ))}
                
                    </Select>
                                    
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
                    Update
                </PrimaryButton>
            </form>
        </GlobalLayout>
    );
};

export default EditUnit
