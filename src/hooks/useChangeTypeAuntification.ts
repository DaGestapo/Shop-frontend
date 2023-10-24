import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/routeConst-utf"; 

export const useChangeTypeAuntification = ():[
    isRegistration: boolean,
    changeTypeAuth: () => void
] => {
    const [isRegistration, setRegistration] = useState<boolean>(true);
    const {pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(pathname === '/home/login') {
            setRegistration(false);
        } else {
            setRegistration(true);
        }
       
    }, [pathname]);

    const changeTypeAuth = () => {
        if(pathname === '/home/login') {
            navigate(REGISTRATION_ROUTE);
        } else {
            navigate(LOGIN_ROUTE);
        }
    }

    return [isRegistration, changeTypeAuth];
}