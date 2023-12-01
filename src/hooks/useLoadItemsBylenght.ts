import { useEffect, useState } from "react";
import { useAppSelector } from "./reduxTypedHools";
import { ItemShopI } from "../model/stateModel/itemI";
import { useLoader } from "./useLoader";

export const useLoadItemsByLength = (length: number, typeId: number, itemId?: string | null) => {
    const [items, setItems] = useState<ItemShopI[] | []>([]);
    const reduxState = useAppSelector(state => state);
    const loader = useLoader(10);
    let relatedLength = length;

    useEffect(() => {
        if(reduxState.item[typeId]) {
            let arr = [];
            for(let i = 0; i < relatedLength; i++) {
                if(reduxState.item[typeId].items[i]) {
                    if(reduxState.item[typeId].items[i].id === itemId && itemId) {
                        relatedLength++;
                    } else {
                        arr.push(reduxState.item[typeId].items[i]);  
                    } 
                }
            }
            setItems(arr);
        } else {
            loader()(typeId);
        }
    }, [reduxState.item, itemId]);

    return items;
}