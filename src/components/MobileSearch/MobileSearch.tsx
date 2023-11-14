import { FC, FocusEvent, createRef} from "react";
import module from './MobileSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {magGlassIcon, heartIcon, bellIcon, crossIcon, microfoneIcon} from '../../utils/icons-utf';

interface MobileSearchI {}

const MobileSearch: FC<MobileSearchI> = () => {
    const sectionRef = createRef<HTMLElement>();

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        if(!sectionRef.current) return;
        sectionRef.current.classList.add(module.focus);
    }

    const onBlure = (e: FocusEvent<HTMLInputElement>) => {
        if(!sectionRef.current) return;
        sectionRef.current.classList.remove(module.focus);
    }
    return (
        <section ref={sectionRef} className={module.mobileSearch}>
            <div className={module.search}>
                <FontAwesomeIcon icon={magGlassIcon}/>
                <input onBlur={onBlure} onFocus={onFocus} type="text" placeholder='Search Product'/>
                <FontAwesomeIcon icon={heartIcon}/>
                <FontAwesomeIcon icon={bellIcon}/>
                <FontAwesomeIcon icon={crossIcon}/>
            </div>
            <FontAwesomeIcon icon={microfoneIcon}/>
        </section>
    )
} 

export default MobileSearch;