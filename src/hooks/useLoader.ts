import itemApi from "../http/itemAPI";
import { ItemFullI } from "../model/stateModel/itemI";
import { useAppDispatch, useAppSelector } from "./reduxTypedHools";
import {addNewByTypeId, paginationByTypeId } from "../store/redusers/itemReduser";
import { setMessageError } from "../store/redusers/messageReduces";

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
    
            let data: ItemFullI[] | Error;
            if(typeId === 0) {
                data = await itemApi.getAllitems.bind(itemApi)({limit, page});
            } else {
                data = await itemApi.getAllitems.bind(itemApi)({limit, page, typeId});
            }


            
            if(data instanceof Error) {
                dispatch(setMessageError(data.message));
            } else if(page && data) {
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