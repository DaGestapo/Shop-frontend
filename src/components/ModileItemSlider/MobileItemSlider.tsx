import { FC, PropsWithChildren, useEffect, useState, createRef } from "react"
import module from './MobileItemSlider.module.scss';

import MobileSliderHeader from "../MobileSliderHeader/MobileSliderHeader";
import ShopItem from "../ShopItem/ShopItem";

import { getHotItems } from "../../http/itemAPI";
import { ItemFullI } from "../../model/stateModel/itemI";
import { ElementSlider } from "../../service/elementSlider";

import { TypeElementSlider } from "../../service/elementSlider";

interface MobileItemSliderI extends PropsWithChildren {

}

const MobileItemSlider: FC<MobileItemSliderI> = ({children}) => {
    const [items, setItems] = useState<ItemFullI[]>([]);
    const listRef = createRef<HTMLElement>();

    useEffect(() => {
        getHotItems({limit: 5})
            .then(data => {
                setItems(data);
            })
    }, []);

    useEffect(() => {
        if(!listRef.current) return;

        let elementSlider: TypeElementSlider | null = new ElementSlider(listRef.current, 150, 10);


        return () => {
            elementSlider = null;
        }
    }, )

    return (
        <article className={module.itemSlider}>
            <MobileSliderHeader>
               {children}
            </MobileSliderHeader>
            <section ref={listRef} className={module.itemSlider__list}>
                {items.map(item => 
                   <ShopItem 
                        key={item.id + 'saleOff'}
                        position="absolute"
                        width={150}
                        item={item}
                    />  
                )}
            </section>
        </article>
    )

}

export default MobileItemSlider;