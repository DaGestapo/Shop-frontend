import { ItemI } from "../stateModel/itemI";

export interface CartRequestParamsI {
    quantity: number;
    color: string;
    size: number;
}

export interface CartItemResponseI {
    id: string;
    item: ItemI;
    cart_item_information: CartRequestParamsI;
}

export interface CartResponseI {
    id: string;
    cart_item: CartItemResponseI[];
} 