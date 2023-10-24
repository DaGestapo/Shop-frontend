import { useState, useEffect } from "react";
import { ItemFullI } from "../model/stateModel/itemI";
import { useAppSelector, useAppDispatch } from "./reduxTypedHools";
import { findItemInStateById } from "../utils/findItemInStateById";
import { useLocation } from "react-router-dom";
import urlService from "../service/urlService";
import { getItemById } from "../http/itemAPI";
import { addNewItem } from "../store/redusers/itemReduser";


export const useGetItem = (): [
    item: ItemFullI | null,
    isLoading: boolean,
    error: {isError: boolean, message: string}
] => {
    const [item, setItem] = useState<ItemFullI | null>(null);
    const itemState = useAppSelector(state => state.item);
    const {pathname} = useLocation();
    const dispath = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{isError: boolean, message: string}>({
        isError: false,
        message: ''
    });
    

    useEffect(() => {   
        setIsLoading(true);

        const endpoints = urlService.convertUrlToArray(pathname);
        const itemId = urlService.getItemId(endpoints);
        const findedItem = findItemInStateById(itemState, itemId);
    
        if(findedItem) {
            setIsLoading(false);
            setItem(findedItem);
        } else {
            setTimeout(() => {
                getItemById(itemId)
                .then(data => {
                    setIsLoading(false);
                    dispath(addNewItem(data));
                })
                .catch((messageError) => {
                    setIsLoading(false);
                    setError({isError: true, message: messageError});
                    setItem(null);
                });
            }, 1000);
           
        }
    }, [pathname, itemState]);


    return [item, isLoading, error];

}