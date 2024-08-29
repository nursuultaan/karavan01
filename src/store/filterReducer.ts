// src/store/yourReducer.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {filterData} from "../util/types.ts";

const initialState:filterData ={
    locations:[],
    priceFrom:0,
    priceTo:0,
    category:"all"
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        // Define your actions here
        updateFilterData: (state, action:PayloadAction) => {
            console.log("Payload;",action.payload);
            // @ts-ignore
            if (action.payload.locations) {
                // @ts-ignore
                state.locations = [...action.payload.locations.flat()];
            }
            // @ts-ignore
            state.priceFrom = action.payload.priceFrom;
            // @ts-ignore
            state.priceTo = action.payload.priceTo;
           console.log("Locations :",state.locations);
        },

        updateCategory :(state ,action:PayloadAction<string>)=>{
            state.category = action.payload;
        },

        clearFilterData(state) {
            state.locations = [];
            state.priceFrom = 0;
            state.priceTo = 0;
        }

    },
});

export const { updateFilterData,updateCategory,clearFilterData } = filterSlice.actions;
export default filterSlice.reducer;
