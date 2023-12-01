import {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from "./reduxTypedHools";
import {CustomeErrorI, removeError} from '../store/redusers/errorReduces';


export const useError = (timer: number): [
    error: CustomeErrorI,
    closeError: (divRef: HTMLDivElement, hideClassName: string) => void
] => {
    const error = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            dispatch(removeError());
        }, timer);

        return () => {
            clearTimeout(timeout);
        }
    }, [error]);

    const closeError = (divRef: HTMLDivElement, hideClassName: string) => {
        if(!divRef) return;
        divRef.classList.add(hideClassName);
    
        setTimeout(() => {
            dispatch(removeError());
        }, 300)
    }

    return [error, closeError];
}


