import { constTypeArr } from "../utils/idConst-utf"
import { useLocation } from "react-router-dom";

export const useGetTypeIdByEndpoint = (): number => {
    const {pathname} = useLocation();

    let endpointsArr = pathname.split('/');
    
    const type = constTypeArr.find(item => {
        if(item.name === endpointsArr[endpointsArr.length - 1]) {
            return item;
        }
    });
    return type ? type.id : 0;
    
}