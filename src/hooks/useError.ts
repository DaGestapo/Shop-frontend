import { useAppDispatch } from "./reduxTypedHools"
import { setMessageError, setMessage } from "../store/redusers/messageReduces";

export const useError = () => {
    const dispatch = useAppDispatch();

    return async <T>(callback: T): Promise<any>=> {
        if(!(callback instanceof Promise)) return null;


        const promise = new Promise((resolve, reject) => {
            callback.then(data => {
                if(data instanceof Error) {
                    dispatch(setMessageError(data.message));
                    return;
                } 

                if(data['message']) {
                    dispatch(setMessage(data['message']));

                } 
                
                resolve(data);
    
            })
        });
        return promise;
       
    }
    
}