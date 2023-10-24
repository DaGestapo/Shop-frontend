import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {  WishedResponseI } from "../../model/serverModel/wishI";
import {WhishedI} from '../../model/stateModel/wishI';


const initialState: {wishedItems: WhishedI[]} = {
    wishedItems: []
}

export const wishSlice = createSlice({
    name: 'wish',
    initialState, 
    reducers: {
        addNewItem: (state, action: PayloadAction<WishedResponseI>) => {
            const payload = action.payload;

            for(let i=0; i < state.wishedItems.length; i++) {
                if(state.wishedItems[i].id === payload.id) return;
            }
            state.wishedItems.push({
                id: payload.id,
                item: {
                    id: payload.item.id,
                    price: payload.item.priceOff
                        ? payload.item.priceOff
                        : payload.item.price,
                    name: payload.item.name,
                    sizes: JSON.parse(payload.item.item_info.sizes),
                    colors: JSON.parse(payload.item.item_info.colors),
                    img: payload.item.img
                }
            });
        },

        setInitialWishState: (state, action: PayloadAction<WishedResponseI[]>) => {
            let tempArr = [] as WhishedI[];
            const payload = action.payload;

            for(let i = 0; i< payload.length; i++) {
                let price = payload[i].item.priceOff;
                const name = payload[i].item.name;
                const img = payload[i].item.img;
                const colors = JSON.parse(payload[i].item.item_info.colors);
                const sizes = JSON.parse(payload[i].item.item_info.sizes);

                if(!price) {
                    price = payload[i].item.price;
                }
            
                tempArr.push({
                    id: payload[i].id,
                    item: {
                        id: payload[i].item.id,
                        name,
                        price,
                        img,
                        colors,
                        sizes
                    }
                })
            }
            state.wishedItems = tempArr;
        },   
    }
});

export const {addNewItem, setInitialWishState,} = wishSlice.actions;
export const wishReduser = wishSlice.reducer;