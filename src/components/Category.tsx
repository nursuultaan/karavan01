import {useDispatch, useSelector} from "react-redux";
import {updateCategory} from "../store/filterReducer.ts";

const Category = () => {


    const categories = ['all','auto','realty','jobs','other'];
    const dispatch = useDispatch();
    // @ts-ignore
    const filterData = useSelector(state => state.filter);



    return (
        <div className={""}>
            <div
                className="flex items-center gap-3 mt-3 -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-white dark:text-gray-800">
                {categories.map((category)=>{
                    const isActive = filterData.category === category;
                    return(<li key={category} onClick={()=>dispatch(updateCategory(category))}   className={`flex items-center cursor-pointer flex-shrink-0 px-5 py-2 capitalize ${
                        isActive ? 'text-yellow-500' : 'dark:text-gray-600'
                    }`}>{category}</li>)
                })}

            </div>
        </div>
    );
};

export default Category;