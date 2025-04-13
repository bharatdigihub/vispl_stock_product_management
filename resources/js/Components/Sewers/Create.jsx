import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout"; // Import GlobalLayout
import SelectDropdown from "../SelectDropdown"; // Import SelectDropdown
import TextInput from "../TextInput"; // Import TextInput
import InputLabel from "../InputLabel"; // Import InputLabel
import InputError from "../InputError"; // Import InputError
import PrimaryButton from "../PrimaryButton";
import { Select } from "@headlessui/react";


const CreateSewer = ({ productionhouses,productionunits,units,roles, permissions, routes }) => { 
    // const { units = [] } = usePage().props;// Accept routes as a prop
    const { data, setData, post, errors } = useForm({
        name: "",
        unitid: "0",
        productionunitid: "0",
        productionhouseid: "0",
        manpower:"0",
        unitprice:"0",
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store); // Use the store route passed from the backend
    };

    return (
        <GlobalLayout> {/* Wrap with GlobalLayout */}
            <form onSubmit={handleSubmit}>
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Add New Sticher Group</h1>
                <div className="tw-mb-4">
                    <InputLabel value="Group Name" className="tw-mb-1" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="tw-w-full rounded-md border border-gray-950"
                        placeholder="Enter Group name" // Added placeholder
                    />
                    <InputError message={errors.name} className="tw-mt-1" />
                </div>

                <div className="tw-mb-4">
                <InputLabel value="Select  Factory" className="tw-mb-1 m-1" />
                <Select className="ml-2"aria-label="Default select example"onChange={(e) => setData("productionhouseid", e.target.value)}>      
                {productionhouses.map((productionhouse) => (
                     <option key={productionhouse.id} value={productionhouse.id}>
                        {productionhouse.name}
                     </option>
                 ))}
                </Select>                    
                </div>

                <div className="tw-mb-4">
                <InputLabel value="Select  Unit" className="tw-mb-1 m-1" />
                <Select className="ml-2"aria-label="Default select example"onChange={(e) => setData("productionunitid", e.target.value)}>      
                {productionunits.map((productionunit) => (
                     <option key={productionunit.id} value={productionunit.id}>
                        {productionunit.name}
                     </option>
                 ))}
                </Select>                    
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
                /
                <Select className="ml-2 sm-3"aria-label="Default select example"onChange={(e) => setData("unitid", e.target.value)}>      
                {units.map((unit) => (
                         <option key={unit.id} value={unit.id}>
                             {unit.unitname}
                        </option>
                 ))}
                </Select>                    
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

export default CreateSewer;
