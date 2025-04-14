import React from "react";
import { useForm } from "@inertiajs/react";
import GlobalLayout from "../../Layouts/GlobalLayout";
import SelectDropdown from "../SelectDropdown";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import { useTheme } from "../../Contexts/ThemeContext";

const CreateSewer = ({ productionhouses, productionunits, units, routes }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        unitid: "",
        productionunitid: "",
        productionhouseid: "",
        manpower: "0",
        unitprice: "0",
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(routes.store);
    };

    return (
        <GlobalLayout>
            <div className={`tw-max-w-4xl tw-mx-auto tw-p-6 tw-rounded-xl tw-shadow-lg tw-border ${theme.border.sidebarOuter} ${theme.header} ${theme.text}`}>
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-8">
                    Add New Stitcher Group
                </h1>

                <form onSubmit={handleSubmit} className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">

                    {/* Group Name */}
                    <div>
                        <InputLabel value="Group Name" className="tw-mb-1" />
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`tw-w-full tw-rounded-md tw-p-2 ${theme.border.sidebarOuter} ${theme.inputBackground}`}
                            placeholder="Enter Group Name"
                        />
                        <InputError message={errors.name} className="tw-mt-1" />
                    </div>

                    {/* Factory */}
                    <div>
                        <InputLabel value="Factory" className="tw-mb-1" />
                        <SelectDropdown
                            value={data.productionhouseid}
                            onChange={(e) => setData("productionhouseid", e.target.value)}
                            options={productionhouses}
                            placeholder="Select Factory"
                        />
                        <InputError message={errors.productionhouseid} className="tw-mt-1" />
                    </div>

                    {/* Production Unit */}
                    <div>
                        <InputLabel value="Production Unit" className="tw-mb-1" />
                        <SelectDropdown
                            value={data.productionunitid}
                            onChange={(e) => setData("productionunitid", e.target.value)}
                            options={productionunits}
                            placeholder="Select Unit"
                        />
                        <InputError message={errors.productionunitid} className="tw-mt-1" />
                    </div>

                    {/* Manpower */}
                    <div>
                        <InputLabel value="Manpower" className="tw-mb-1" />
                        <TextInput
                            type="number"
                            value={data.manpower}
                            onChange={(e) => setData("manpower", e.target.value)}
                            className={`tw-w-full tw-rounded-md tw-p-2 ${theme.border.sidebarOuter} ${theme.inputBackground}`}
                            placeholder="Enter Number of Manpower"
                        />
                        <InputError message={errors.manpower} className="tw-mt-1" />
                    </div>

                    {/* Unit Price */}
                    <div>
                        <InputLabel value="Wage Rate" className="tw-mb-1" />
                        <TextInput
                            type="number"
                            value={data.unitprice}
                            onChange={(e) => setData("unitprice", e.target.value)}
                            className={`tw-w-full tw-rounded-md tw-p-2 ${theme.border.sidebarOuter} ${theme.inputBackground}`}
                            placeholder="Enter Wage Rate"
                        />
                        <InputError message={errors.unitprice} className="tw-mt-1" />
                    </div>

                    {/* Wage Unit */}
                    <div>
                        <InputLabel value="Wage Unit" className="tw-mb-1" />
                        <SelectDropdown
                            value={data.unitid}
                            onChange={(e) => setData("unitid", e.target.value)}
                            options={units}
                            placeholder="Select Unit"
                        />
                        <InputError message={errors.unitid} className="tw-mt-1" />
                    </div>

                    {/* Submit */}
                    <div className="tw-col-span-1 md:tw-col-span-2 tw-text-center">
                        <PrimaryButton
                            type="submit"
                            className={`${theme.button} ${theme.padding} tw-rounded-md`}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GlobalLayout>
    );
};

export default CreateSewer;
