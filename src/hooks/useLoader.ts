import { getItems } from "../http/itemAPI";
import { ItemFullI } from "../model/stateModel/itemI";
import { useAppDispatch, useAppSelector } from "./reduxTypedHools";
import {addNewByTypeId, paginationByTypeId } from "../store/redusers/itemReduser";

export const useLoader = (limit: number) => {
    const stateItems = useAppSelector(state => state.item);
    const dispatch =  useAppDispatch();

    return () => {
        return async (typeId: number, page?: number) => {
            for(let i = 0; i < stateItems.length; i++) {
                if(page) break;
                if(stateItems[typeId] && stateItems[typeId].items.length === 8) {
                    return;
                }
            }
    
            let data: ItemFullI[];
            if(typeId === 0) {
                data = await getItems({limit, page});
            } else {
                data = await getItems({limit, page, typeId});
            }
            if(page) {
                dispatch(paginationByTypeId({
                    typeId,
                    items: data
                }))
            } else {
                dispatch(addNewByTypeId({
                    typeId,
                    items: data
                }));
            }
        }
    }


}