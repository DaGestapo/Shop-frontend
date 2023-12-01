import { useState, useEffect } from "react";
import { ItemFullI } from "../model/stateModel/itemI";
import { useAppSelector, useAppDispatch } from "./reduxTypedHools";
import { findItemInStateById } from "../utils/findItemInStateById";
import { useLocation } from "react-router-dom";
import urlService from "../service/urlService";
import itemApi from "../http/itemAPI";
import { addNewItem } from "../store/redusers/itemReduser";
import { setError } from "../store/redusers/errorReduces";
import { getErrorMessageFromServer } from "../utils/getErrorMessageFromServer";
import { AxiosError } from "axios";

export const useGetItem = (): [
    item: ItemFullI | null,
    isLoading: boolean,
] => {
    const [item, setItem] = useState<ItemFullI | null>(null);
    const itemState = useAppSelector(state => state.item);
    const {pathname} = useLocation();
    const dispath = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {   
        setIsLoading(true);

        const endpoints = urlService.convertUrlToArray(pathname);
        const itemId = urlService.getItemId(endpoints);
        const findedItem = findItemInStateById(itemState, itemId);
    
        if(findedItem) {
            setIsLoading(false);
            setItem(findedItem);
        } else {
    
            itemApi.getItemById.bind(itemApi)(itemId)
                .then(data => {
                    setIsLoading(false);
                    
                    if(!(data instanceof Error) ){
                        dispath(addNewItem(data));
                    } else {
                        setIsLoading(false);
                        dispath(setError(data.message))
                        setItem(null);
                    }
                });
        
           
        }
    }, [pathname, itemState]);


    return [item, isLoading];

}