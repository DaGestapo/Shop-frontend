import {FC, createRef, useEffect, useState} from 'react';
import module from './ShopFilterSlider.module.scss';

import { PriceSlider, typeSlider } from '../../service/priceSliderService';
import { IntervalType } from '../../utils/type-utf';

import { PricesI } from '../../model/serviceModel/PriceI';

export interface SidebarShopPropsI {
    sidebar: HTMLElement | null;
    prices: PricesI,
    setPrices:React.Dispatch<React.SetStateAction<PricesI>>
}

const ShopFilterSlider:FC<SidebarShopPropsI> = ({sidebar, prices, setPrices}) => {
  const [slider, setSlider] = useState<typeSlider | null>(null);
  
  const leftDoteRef = createRef<HTMLDivElement>();
  const rightDoteRef= createRef<HTMLDivElement>();
  const sliderRef = createRef<HTMLDivElement>();
  const priceRangeRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if(
      leftDoteRef.current &&
      sliderRef.current && 
      rightDoteRef.current && 
      sidebar && 
      priceRangeRef.current
    ) {
      setSlider( new PriceSlider(
        priceRangeRef.current, 
        sidebar, 
        sliderRef.current, 
        leftDoteRef.current, 
        rightDoteRef.current
      ))
    }

    return () => {
      setSlider(null);
    }
  }, [sidebar]);


  useEffect(() => {
    let intervar: IntervalType;
    if(slider) {
      intervar = setInterval(() => {
        setPrices({...prices, leftPrice: slider.getLeftPrice, rightPrice: slider.getRightPrice});
      }, 400)
    }
    return () => {
      clearInterval(intervar);
    }
    
  }, [slider]);

  return (
    <article className={module.price}>
        <h3>Price</h3>
        <div>
            <p>
            <span>{prices.leftPrice}$</span>
            -
            <span>{prices.rightPrice}$</span>
            </p>
            <div 
            className={module.slidercontainer}
            ref={sliderRef}
            >
                <div ref={rightDoteRef} id='end' className={module.dote}/>
                <div ref={leftDoteRef} id='left' className={module.dote}/>
                <div ref={priceRangeRef} className={module.priceRange}/>
            </div>
        </div>
    </article>
   
  );
}

export default ShopFilterSlider;
