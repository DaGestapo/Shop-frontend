import {FC, PointerEvent, useEffect, useState, Dispatch} from 'react';
import module from './SelectQuantityUI.module.scss';

import { CartInformationI } from '../../model/stateModel/cartI';


interface SelectQuantityUII {
  state:CartInformationI | number;
  changeValue: Dispatch<React.SetStateAction<number>>
}

const SelectQuantityUI: FC<SelectQuantityUII> = ({state, changeValue}) => {
    const [value, setValue] = useState<number>(
      typeof state === 'number'? state : 1
    );

    const itemCounter = (e: PointerEvent<HTMLButtonElement>) => {
        const target = e.target;
        if(!(target instanceof HTMLButtonElement)) return;
    
        const targetId = target.id;
        
        switch (targetId) {
          case 'add':
            if(value >= 10) return;
            setValue(value + 1)
            break;
    
          case 'subtract':
            if(value <= 1) return;
            setValue(value - 1)
            break;
        
          default:
            break;
        }
        
    
      }

      useEffect(() => {
        if(state === undefined || changeValue === undefined) return;
        
        changeValue(value);
       
      }, [value]);

    return (
        <div className={module.quantity}>
                  <button 
                    className={module.quantity__button}
                    id='subtract'
                    onClick={itemCounter}
                    >
                      -
                    </button>
                  <div 
                    className={`${module.quantity__display_right}`}
                    >
                      {value}
                    </div>
                
                  <button 
                    className={module.quantity__button}
                    id='add'
                    onClick={itemCounter}
                    >
                      +
                    </button>
                </div>
    )
}

export default SelectQuantityUI;
