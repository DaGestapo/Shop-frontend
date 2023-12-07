import {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from "./reduxTypedHools";
import {CustomeMessageI, removeMessage} from '../store/redusers/messageReduces';


export const useServerMessage = (timer: number): [
    error: CustomeMessageI,
    closeError: (divRef: HTMLDivElement, hideClassName: string) => void
] => {
    const messageState = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            dispatch(removeMessage());
        }, timer);
        return () => {
            clearTimeout(timeout);
        }
    }, [messageState]);

    const closeError = (divRef: HTMLDivElement, hideClassName: string) => {
        if(!divRef) return;
        divRef.classList.add(hideClassName);
    
        setTimeout(() => {
            dispatch(removeMessage());
        }, 300)
    }

    return [messageState, closeError];
}


