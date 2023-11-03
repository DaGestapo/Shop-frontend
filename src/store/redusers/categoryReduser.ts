import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OptionsI } from "../../model/serverModel/optionsI";



const initialState: {list: OptionsI[]} = {
    list: []
}


export const categorySlice = createSlice({
    name: 'category',
    initialState, 
    reducers: {
        setCategiryes: (state, action: PayloadAction<OptionsI[]>) => {
            state.list = action.payload;
        }
        
    }
});

export const {
    setCategiryes
} = categorySlice.actions;

export const categoryReduser = categorySlice.reducer;