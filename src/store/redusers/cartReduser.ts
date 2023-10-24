import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemResponseI } from "../../model/serverModel/cartI";
import { CartI, CartedItemStateI } from "../../model/stateModel/cartI";

const initialState: CartI = {
    total: 0,
    cartedItem: []
}

function calcTotalPrice (cartedItems: CartedItemStateI[]) {
    let totalPrice = 0;
    cartedItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    return totalPrice;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addNewItem: (state, action: PayloadAction<CartedItemStateI>) => {
            for(let i=0; i < state.cartedItem.length; i++) {
                if(state.cartedItem[i].id === action.payload.id) return;
            }
            state.cartedItem.push(action.payload);
            state.total = calcTotalPrice(state.cartedItem);
        },

        setInitialCartState: (state, action: PayloadAction<CartItemResponseI[]>) => {
            let tempArr = [] as CartedItemStateI[];
            const payload = action.payload;

            for(let i = 0; i< payload.length; i++) {
                let price = payload[i].item.priceOff;
                if(!price) {
                    price = payload[i].item.price;
                }
                    
                tempArr.push({
                    id: payload[i].id,
                    quantity: payload[i].cart_item_information.quantity,
                    price,
                    name: payload[i].item.name,
                    img: payload[i].item.img,
                    color: payload[i].cart_item_information.color,
                    size: payload[i].cart_item_information.size
                });
            }

            state.cartedItem = tempArr;
            state.total = calcTotalPrice(state.cartedItem);
        },

        changeQuantityByCartedItemId: (state, action: PayloadAction<{id: string, quantity: number}>) => {
            const payload = action.payload;

            for(let i = 0; i < state.cartedItem.length; i++) {
                if(state.cartedItem[i].id === payload.id) {
                    state.cartedItem[i].quantity = payload.quantity;
                }
            }

            state.total = calcTotalPrice(state.cartedItem);
        },

        
    }
});

export const {addNewItem, setInitialCartState, changeQuantityByCartedItemId} = cartSlice.actions;
export const cartReduser = cartSlice.reducer;