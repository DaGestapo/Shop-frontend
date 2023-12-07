import { FC, PropsWithChildren, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";
import module from './MessagePopup.module.scss';


interface MessagePopupI extends PropsWithChildren {
    closePopup: (divRef: HTMLDivElement, hideClassName: string) => void;
    isError: boolean;
}

const MessagePopup: FC<MessagePopupI> = ({children, isError,  closePopup}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [showPopUp, setShowPopup] = useState<boolean>(false);


    const onClick = () => {
        if(!divRef.current) return;
        setShowPopup((prev) => !prev);

        closePopup(divRef.current, module.hide);
    }

    return (
        <CSSTransition nodeRef={divRef} in={showPopUp} timeout={200}>
            <div ref={divRef} className={`${module.messagePopup} ${isError ? module.error : module.message}`}>
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

export default MessagePopup;