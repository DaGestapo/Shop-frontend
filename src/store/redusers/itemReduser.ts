import { createSlice } from "@reduxjs/toolkit";
import { ItemFullI } from "../../model/stateModel/itemI";
import { PayloadAction } from "@reduxjs/toolkit";
import { ItemsI } from "../../model/stateModel/itemI";
import { ReviewRequestResponseWitchUserI } from "../../model/serverModel/ratingReviewI";
import { ReviewI } from "../../model/stateModel/reviewI";

const initialState = [] as ItemsI[];


export const itemsSlice = createSlice({
    name: 'items',
    initialState, 
    reducers: {
        addNewByTypeId: (state, action: PayloadAction<ItemsI>) => {
            state[action.payload.typeId] = action.payload;
        },

        addNewItem: (state, action: PayloadAction<ItemFullI>) => {
            if(!state[0]) {
                state[0] = {
                    typeId: 0,
                    items: []
                }
            }
            state[0].items.push(action.payload);

        },

        paginationByTypeId: (state, action: PayloadAction<ItemsI>) => {
            const typeId = action.payload.typeId;
            const items = action.payload.items;
  
            if(state[typeId].typeId === typeId) {
                state[typeId].items = state[typeId].items.concat(items);
            }
        
        },
        
        changeItemsByTypeId: (state, action: PayloadAction<ItemsI>) => {
            const typeId = action.payload.typeId;
            const items = action.payload.items;
             

            if(state[typeId].typeId === typeId) {
                state[typeId].items = items;
            
            }
        },

        deleteItemByItemId: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;

            for(let i = 0; i < state.length; i++) {
                let findedItem: boolean = false; 

                if(!state[i]) continue;

                for(let j = 0; j < state[i].items.length; j++) {
                    if(itemId === state[i].items[j].id) {
                        findedItem = true;
                    }
                    console.log(findedItem);
                    if(findedItem && state[i].items[j+1]) {
                        state[i].items[j] = state[i].items[j+1];
                        
                    }
        
                    if(findedItem && j === state[i].items.length - 1) {
                        state[i].items.pop();
                    }
                }
            }
        },

        refreshItemInformation: (state, action: PayloadAction<{id: string, reviews: ReviewI[]}>) => {
            const itemId = action.payload.id;
            
            console.log(action.payload);
            console.log(state);
            for(let itemList of state) {
                if(itemList.items[0].id === itemId) {
                    
                    itemList.items[0].review = action.payload.reviews;
                }
            }
        }
        
    }
});

export const {
    addNewByTypeId, 
    changeItemsByTypeId, 
    paginationByTypeId, 
    addNewItem,
    deleteItemByItemId,
    refreshItemInformation
} = itemsSlice.actions;

export const itemReduser = itemsSlice.reducer;