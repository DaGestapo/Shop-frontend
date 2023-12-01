import { FC, PropsWithChildren, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";
import module from './ErrorPopup.module.scss';


interface ErrorPopupI extends PropsWithChildren {
    closeError: (divRef: HTMLDivElement, hideClassName: string) => void
}

const ErrorPopup: FC<ErrorPopupI> = ({children, closeError}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [showPopUp, setShowPopup] = useState<boolean>(false);


    const onClick = () => {
        if(!divRef.current) return;
        setShowPopup((prev) => !prev);

       closeError(divRef.current, module.hide);
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