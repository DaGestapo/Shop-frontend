import {FC, MouseEvent, createRef, Dispatch} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ShopLandingOption.module.scss';

import { SortOptionsI } from '../../model/sortI';

import { shevronIcon } from '../../utils/icons-utf';


export interface ShopLandingOptionPropsI {
  options: string[] | [];
  selected: string | null;
  setOptions: Dispatch<React.SetStateAction<SortOptionsI>>
}

const ShopLandingOption:FC<ShopLandingOptionPropsI> = ({
    options, 
    selected, 
    setOptions
}) => {
    const contentOptionRef = createRef<HTMLUListElement>()

    const showDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    if(!contentOptionRef.current) return;
    const target = contentOptionRef.current;
    target.classList.toggle(module.show);

    } 

    const selectOption = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target;
    const content = contentOptionRef.current;

    if(!(target instanceof HTMLLIElement)) return;
    if(!content) return;
    
    setOptions({options, selected: target.id});
    content.classList.toggle(module.show);
    } 

    return (
        <div className={module.dropDown}>
            <button 
                className={module.dropbtn}
                onClick={showDropdown}
            >
                {selected}
                <FontAwesomeIcon icon={shevronIcon}/>  
            </button>
            <ul 
                className={module.dropDown__content}
                ref={contentOptionRef}
                onClick={selectOption}
            >
                {options.map(item => 
                <li id={item} key={item}>{item}</li>
                )}
            </ul>
        </div>
    );
}

export default ShopLandingOption;
