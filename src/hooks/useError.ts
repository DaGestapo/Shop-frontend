import { useAppDispatch } from "./reduxTypedHools"
import { setError } from "../store/redusers/errorReduces";

export const useError = () => {
    const dispatch = useAppDispatch();

    return async <T>(callback: T): Promise<any>=> {
        if(!(callback instanceof Promise)) return null;


        const promise = new Promise((resolve, reject) => {
            callback.then(data => {
                if(data instanceof Error) {
                    dispatch(setError(data.message));
                } else {
               
                    resolve(data);
                }
            })
        });
        return promise;
       
    }
    
}