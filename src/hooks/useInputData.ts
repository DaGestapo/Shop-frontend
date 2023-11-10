import { useState, ChangeEvent, Dispatch } from "react";
import { RegistrationDataI } from "../model/userI";

export const useInputData = <T>(initialObj: T)
: [
    T,
    Dispatch<React.SetStateAction<T>>,
     Function
    ] => {
    const [data, setData] = useState<T>(initialObj);

    const changeFunc = ( fieldName: string) => {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            
            for(let key in data) {
                if(key === fieldName) {
                    setData({...data, [fieldName]: e.target.value});
                }
                
            }
        }
        }
    return [data, setData, changeFunc, ];
}
