import {FC, useEffect, createRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './MobileCategory.module.scss';

import MobileSliderHeader from '../MobileSliderHeader/MobileSliderHeader';


import { ItemSlider, TypeElementSlider } from '../../service/itemSlider';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHools';
import { setCategiryes } from '../../store/redusers/categoryReduser';

import {brandApi, typeApi} from '../../http/brandTypeAPI';

import { OptionsI } from '../../model/serverModel/optionsI';

import { userIcon } from '../../utils/icons-utf';

interface MobileCategoryI {

}

const MobileCategory: FC<MobileCategoryI> = () => {
    const listRef = createRef<HTMLElement>();
    const mobileCategoryRef = createRef<HTMLElement>();

    const category = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadOptions();

        async function loadOptions() {
            let typesOptions = await typeApi.getAllBrandType();
            let brandsOprions = await brandApi.getAllBrandType();

            if(!(brandsOprions instanceof Error) && !(typesOptions instanceof Error)) {
                let options = typesOptions.concat(brandsOprions);
                dispatch(setCategiryes(options));
            }
        
        }
        
    }, []);

   useEffect(() => {
        if(!listRef.current) return;

        let elementSlider: TypeElementSlider | null = new ItemSlider(
            listRef.current, 
            100, 
            10, 
            100, 
            4
        );

        return () => {
            elementSlider = null;
        }
   }, [category]);

    return (
        <article 
            className={module.mobileCategory}
            ref={mobileCategoryRef}
            >
            <MobileSliderHeader showLink={true}>
                Category
            </MobileSliderHeader>
            <section ref={listRef} className={`${module.mobileCategory__list} mobileList`}>
                {category.list.map((option, index) => 
                    <article 
                        key={option.id + option.name}
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