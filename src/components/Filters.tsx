import { Button } from 'antd';
import { Cascader } from 'antd';
import qs from 'qs';
import { InputNumber } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {clearFilterData, updateFilterData} from "../store/filterReducer.ts";
import axios from "axios";
import {post} from "../util/types.ts";
import {useEffect, useState} from "react";

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
    disableCheckbox?: boolean;
}

const options: Option[] = [
    { label: 'Alabama', value: 'alabama' },
    { label: 'Alaska', value: 'alaska' },
    { label: 'Arizona', value: 'arizona' },
    { label: 'Arkansas', value: 'arkansas' },
    { label: 'California', value: 'california' },
    { label: 'Colorado', value: 'colorado' },
    { label: 'Connecticut', value: 'connecticut' },
    { label: 'Delaware', value: 'delaware' },
    { label: 'Florida', value: 'florida' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Hawaii', value: 'hawaii' },
    { label: 'Idaho', value: 'idaho' },
    { label: 'Illinois', value: 'illinois' },
    { label: 'Indiana', value: 'indiana' },
    { label: 'Iowa', value: 'iowa' },
    { label: 'Kansas', value: 'kansas' },
    { label: 'Kentucky', value: 'kentucky' },
    { label: 'Louisiana', value: 'louisiana' },
    { label: 'Maine', value: 'maine' },
    { label: 'Maryland', value: 'maryland' },
    { label: 'Massachusetts', value: 'massachusetts' },
    { label: 'Michigan', value: 'michigan' },
    { label: 'Minnesota', value: 'minnesota' },
    { label: 'Mississippi', value: 'mississippi' },
    { label: 'Missouri', value: 'missouri' },
    { label: 'Montana', value: 'montana' },
    { label: 'Nebraska', value: 'nebraska' },
    { label: 'Nevada', value: 'nevada' },
    { label: 'New Hampshire', value: 'newhampshire' },
    { label: 'New Jersey', value: 'newjersey' },
    { label: 'New Mexico', value: 'newmexico' },
    { label: 'New York', value: 'newyork' },
    { label: 'North Carolina', value: 'northcarolina' },
    { label: 'North Dakota', value: 'northdakota' },
    { label: 'Ohio', value: 'ohio' },
    { label: 'Oklahoma', value: 'oklahoma' },
    { label: 'Oregon', value: 'oregon' },
    { label: 'Pennsylvania', value: 'pennsylvania' },
    { label: 'Rhode Island', value: 'rhodeisland' },
    { label: 'South Carolina', value: 'southcarolina' },
    { label: 'South Dakota', value: 'southdakota' },
    { label: 'Tennessee', value: 'tennessee' },
    { label: 'Texas', value: 'texas' },
    { label: 'Utah', value: 'utah' },
    { label: 'Vermont', value: 'vermont' },
    { label: 'Virginia', value: 'virginia' },
    { label: 'Washington', value: 'washington' },
    { label: 'West Virginia', value: 'westvirginia' },
    { label: 'Wisconsin', value: 'wisconsin' },
    { label: 'Wyoming', value: 'wyoming' },
];



const Filters = ({ setPosts }) => {
    const dispatch = useDispatch();
    const filterData = useSelector(state => state.filter);

    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [priceFrom, setPriceFrom] = useState<number | null>(null);
    const [priceTo, setPriceTo] = useState<number | null>(null);

    const handleCascaderChange = (value: string[]) => {
        setSelectedLocations(value);
        dispatch(updateFilterData({ locations: value }));
    };

    const handlePriceChangeFrom = (value:number) => {
        setPriceFrom(value);
        dispatch(updateFilterData({ priceFrom: value }));
    };

    const handlePriceChangeTo = (value:number) => {
        setPriceTo(value);
        dispatch(updateFilterData({ priceTo: value }));
    };

    const handleResetClick = () => {
        setSelectedLocations([]);
        setPriceFrom(null);
        setPriceTo(null);
        dispatch(clearFilterData());
        console.log("Reseting and getFilteredPosts;");
        console.log("FIlter data :",filterData);
        getFilteredPosts();
    };

    async function getFilteredPosts() {
        const requestData = {
            category: filterData.category,
            minCost: filterData.priceFrom,
            maxCost: filterData.priceTo,
            locations:filterData.locations
        };
        console.log("Req:",requestData);

        try {
            const response = await axios.get<post[]>("https://localhost:7299/api/products/filtered", {
                params: requestData,
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'repeat' });
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        getFilteredPosts();
    }, [filterData]);

    return (
        <div className={"flex flex-col lg-full gap-2 sm:p-5 p-2 sm:w-[300px]"}>
            <Cascader
                placeholder={"Location"}
                style={{ width: '100%' }}
                options={options}
                onChange={handleCascaderChange}
                value={selectedLocations}
                multiple
                className={"text-lg sm:text-base"}
                maxTagCount="responsive"
                dropdownClassName={" w-[90%] sm:w-[250px] "}
                dropdownRender={(menu) => <div style={{ width: '100%' }}>{menu}</div>}
            />
            <div className={"flex gap-3  w-full mb-4 mt-2"}>
                <InputNumber
                    size="large"
                    min={1}

                    style={{ width: '100%' }}
                    placeholder={"Price From"}
                    onChange={handlePriceChangeFrom}
                    value={priceFrom}
                />
                <InputNumber
                    size="large"
                    min={1}

                    style={{ width: '100%' }}
                    placeholder={"Price To"}
                    onChange={handlePriceChangeTo}
                    value={priceTo}
                />
            </div>
            <Button className={"bg-amazonYellow text-white font-semibold"} onClick={handleResetClick}>Reset</Button>
        </div>
    );
};

export default Filters;