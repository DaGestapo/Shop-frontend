import { FC, ChangeEvent, createRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import module from './FormInputUI.module.scss';

import { useSelectedInput } from '../../hooks/useSelectedInput';

import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FormInputUII {
    icon?: IconProp;
    border?: string;
    placeholder: string;
    value: string;
    checkValue?: boolean;
    setValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInputUI: FC<FormInputUII> = ({
    icon, 
    placeholder,
    value,
    border,
    checkValue,
    setValue
}) => {
    const onFocusInput = useSelectedInput(module.selected);
    const divRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if(!divRef.current) return;
        if(!checkValue && checkValue !== undefined) {
            divRef.current.classList.add(module.false);
        } else {
            divRef.current.classList.remove(module.false);
        }

        if(border === 'gray') {
            divRef.current.classList.add(module.inputUi_gray);
        } 


    }, [checkValue]);


    return (
        <div 
            className={module.inputUi}
            ref={divRef}
            >
            {icon &&
                <FontAwesomeIcon icon={icon} />
            }
            <input 
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            onFocusCapture={(e) => onFocusInput(e.target)}
            onBlur={() => onFocusInput(null)}
            
            />
      </div>
    )
};

export default FormInputUI;

