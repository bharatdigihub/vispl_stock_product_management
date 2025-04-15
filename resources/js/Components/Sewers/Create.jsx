import React from "react";
import { useForm } from "@inertiajs/react";
import { useTheme } from "../../Contexts/ThemeContext"; // Import useTheme
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import TextInput from "../TextInput"; // Import TextInput
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError
import PrimaryButton from "../PrimaryButton";
import SelectInput from "../SelectInput"; // Import SelectInput
import FormLayout from "../../Layouts/FormLayout"; // Import FormLayout

const CreateSewer = ({ productionhouses, productionunits, units, roles, permissions, routes }) => { 
    const { data, setData, post, errors } = useForm({
        name: "",
        unitid: "",
        productionunitid: "",
        productionhouseid: "",
        manpower:"0",
        unitprice:"0",
        
    });

    const { theme } = useTheme(); // Access theme from ThemeContext

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store); // Use the store route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <FormLayout>
                <form onSubmit={handleSubmit}>
                    <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Add New Sticher Group</h1>
                    <div className="tw-mb-4">
                        <InputLabel value="Group Name" className="tw-mb-1" />
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="tw-w-full tw-rounded-md tw-border"
                            placeholder="Enter Group name" // Added placeholder
                        />
                        <InputError message={errors.name} className="tw-mt-1" />
                    </div>

                    <div className="tw-mb-4">
                        <InputLabel value="Select Factory" className="tw-mb-1 m-1" />
                        <SelectInput
                            options={productionhouses}
                            value={data.productionhouseid}
                            onChange={(e) => setData("productionhouseid", e.target.value)}
                            required
                            placeholder="Select a Factory"
                            labelKey="name"
                            valueKey="id"
                        />
                    </div>

                    <div className="tw-mb-4">
                        <InputLabel value="Select Unit" className="tw-mb-1 m-1" />
                        <SelectInput
                            options={productionunits}
                            value={data.productionunitid}
                            onChange={(e) => setData("productionunitid", e.target.value)}
                            required
                            placeholder="Select a Unit"
                            labelKey="name"
                            valueKey="id"
                        />
                    </div>

                    <div className="tw-mb-4">
                        <InputLabel value="Man Power" className="tw-mb-1" />
                        <TextInput
                            type="text"
                            value={data.manpower}
                            onChange={(e) => setData("manpower", e.target.value)}
                            className="tw-w-full"
                            placeholder="Enter Number of Manpower" // Added placeholder
                        />
                        <InputError message={errors.manpower} className="tw-mt-1" />
                    </div>

                    <div className="tw-mb-4">
                        <InputLabel value="Wages Rate" className="tw-mb-1 columns-3" />
                        <TextInput
                            type="text"
                            value={data.unitprice}
                            onChange={(e) => setData("unitprice", e.target.value)}
                            className="tw-w-full"
                            placeholder="Enter wage rate unitwise" // Added placeholder
                        />
                        <InputError message={errors.unitprice} className="tw-mt-1" />
                        <SelectInput
                            options={units}
                            value={data.unitid}
                            onChange={(e) => setData("unitid", e.target.value)}
                            required
                            placeholder="Select a Unit"
                            labelKey="unitname"
                            valueKey="id"
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
            </FormLayout> 
        </GlobalLayout>
    );
};

export default CreateSewer;
