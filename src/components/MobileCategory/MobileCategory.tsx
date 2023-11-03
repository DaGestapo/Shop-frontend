import {FC, useEffect, useState, createRef, PointerEvent, useMemo, memo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './MobileCategory.module.scss';

import MobileSliderHeader from '../MobileSliderHeader/MobileSliderHeader';

import { ElementSlider, TypeElementSlider } from '../../service/elementSlider';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHools';
import { setCategiryes } from '../../store/redusers/categoryReduser';

import { getAllTypes } from '../../http/typeAPI';
import { getAllBrands } from '../../http/brandAPI';

import { OptionsI } from '../../model/serverModel/optionsI';

import { userIcon } from '../../utils/icons-utf';

interface MobileCategoryI {

}

const MobileCategory: FC<MobileCategoryI> = () => {
    const listRef = createRef<HTMLElement>();
    const category = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let options:OptionsI[] = [];

        getAllTypes()
            .then(data => {
                for(let i=0; i < data.length; i++) {
                    
                    options.push(data[i]);
                }
            });
        getAllBrands()
            .then(data => {
                for(let i=0; i < data.length; i++) {
                    options.push(data[i]);
                }
                dispatch(setCategiryes(options));
            })
        
    }, []);

   useEffect(() => {
        if(!listRef.current) return;

        let elementSlider: TypeElementSlider | null = new ElementSlider(listRef.current, 100, 10);

        return () => {
            elementSlider = null;
        }
   }, [category]);

    return (
        <article className={module.mobileCategory}>
            <MobileSliderHeader>
                Category
            </MobileSliderHeader>
            <section ref={listRef} className={module.mobileCategory__list}>
                {category.list.map((option, index) => 
                    <article 
                        className={`${module.mobileCategory__list_item}`}
                        >
                        <FontAwesomeIcon icon={userIcon}/>    
                        {option.name}
                    </article>    
                )}
            </section>
        </article>
    )
}

export default MobileCategory;