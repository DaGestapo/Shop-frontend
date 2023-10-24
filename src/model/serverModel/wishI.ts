import { ItemI } from "../stateModel/itemI";
import { ItemInfoI } from "../stateModel/itemI"; 



export interface WhishedItemInfoResponseI extends ItemInfoI {
    colors: string;
    sizes: string;
}

export interface ResponseItemWhishedI extends ItemI {
    item_info: WhishedItemInfoResponseI;
}

export interface WishedResponseI {
    id: string;
    item: ResponseItemWhishedI;
}