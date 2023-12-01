import { FC, PropsWithChildren, useEffect, useState, createRef } from "react"
import module from './MobileItemSlider.module.scss';

import MobileSliderHeader from "../MobileSliderHeader/MobileSliderHeader";
import ShopItem from "../ShopItem/ShopItem";

import itemApi from "../../http/itemAPI";
import { useAppDispatch } from "../../hooks/reduxTypedHools";
import { useLoadItemsByLength } from "../../hooks/useLoadItemsBylenght";
import { ItemFullI } from "../../model/stateModel/itemI";
import { ItemSlider } from "../../service/itemSlider";

import { TypeElementSlider } from "../../service/itemSlider";
import { setError } from "../../store/redusers/errorReduces";

interface MobileItemSliderI extends PropsWithChildren {
    showLink: boolean;
}

const MobileItemSlider: FC<MobileItemSliderI> = ({children, showLink}) => {
    const [items, setItems] = useState<ItemFullI[]>([]);
    const listRef = createRef<HTMLElement>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        itemApi.getHotItems.bind(itemApi)({limit: 5})
            .then(data => {
            
                if(data instanceof Error) {
                    dispatch(setError(data.message));
                } else {
                    setItems(data);
                }
            })

    }, []);

    useEffect(() => {
        if(!listRef.current) return;

        let elementSlider: TypeElementSlider | null = new ItemSlider(
            listRef.current, 
            150, 
            10, 
            150, 
            3);


        return () => {
            elementSlider = null;
        }
    }, )

    return (
        <article className={module.itemSlider}>
            <MobileSliderHeader showLink={showLink}>
               {children}
            </MobileSliderHeader>
            <section ref={listRef} className={`${module.itemSlider__list} mobileList`}>
                {items.map(item => 
                   <ShopItem 
                        key={item.id + 'saleOff'}
                        position="absolute"
                        item={item}
                    />  
                )}
            </section>
        </article>
    )

}

export default MobileItemSlider;