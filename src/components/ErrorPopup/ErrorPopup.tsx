import { FC, PropsWithChildren, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";
import module from './ErrorPopup.module.scss';

import { useAppDispatch } from "../../hooks/reduxTypedHools";

import { removeError } from "../../store/redusers/errorReduces";
interface ErrorPopupI extends PropsWithChildren {

}

const ErrorPopup: FC<ErrorPopupI> = ({children}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [showPopUp, setShowPopup] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onClick = () => {
        if(!divRef.current) return;
        divRef.current.classList.add(module.hide);

        setShowPopup((prev) => !prev);

        setTimeout(() => {
            dispatch(removeError());
        }, 300)
    }

    return (
        <CSSTransition nodeRef={divRef} in={showPopUp} timeout={200}>
            <div ref={divRef} className={module.errorPopup}>
            <button 
                className={module.close}
                onClick={onClick}
                >
                <div className={`${module.leftLine} ${module.line}`}/>
                <div className={`${module.rightLine} ${module.line}`}/>
            </button>
            {children}
        </div>
        </CSSTransition>
        
    )
}

export default ErrorPopup;