import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './DropDown.module.scss';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface DropDownPropsI {
    icon: IconProp;
    defValue: string
}

const DropDown:FC<DropDownPropsI> = ({icon, defValue}) => {


  return (
    <div className={module.dropdown}>
        <p>{defValue}</p>
        <FontAwesomeIcon icon={icon}/>  
    </div>
  );
}

export default DropDown;
