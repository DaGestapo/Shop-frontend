import {FC, useRef, useState} from 'react';
import module from './SidebarShop.module.scss';

import SideBarOption from '../SideBarOption/SideBarOption';
import ShopFilterSlider from '../ShopFilterSlider/ShopFilterSlider';

import { useLoaderByBrand } from '../../hooks/useLoaderByBrand';
import { useSideBarOptions } from '../../hooks/useSideBarOptions';

import { PricesI } from '../../model/serviceModel/PriceI';

export interface SidebarShopPropsI {
  typeId: number
}

const SidebarShop:FC<SidebarShopPropsI> = ({
  typeId
}) => {
  const [brandOptions, setBrandOptions] = useSideBarOptions('Brands');
  const sidebarRef = useRef<HTMLElement | null>(null);
  const loader = useLoaderByBrand(10);
  const [prices, setPrices] = useState<PricesI>({
    leftPrice: 0,
    rightPrice: 0,
    priceRange: 0
  });

  const findItems = () => {
    const brandId = brandOptions.options.find( options => {
      if(options.selected) {
        return options.id;
      }
    })?.id;
    loader()(typeId, brandId, undefined, prices.leftPrice, prices.rightPrice);
  }


  return (
    <section
      ref={sidebarRef}
      className={module.sidebar}
    >
        <SideBarOption 
          title={brandOptions.title} 
          options={brandOptions.options}
          setBrandOptions = {setBrandOptions}
          typeId={typeId}
        />
        <ShopFilterSlider sidebar={sidebarRef.current} prices={prices} setPrices={setPrices}/>
        <button 
          className={module.findItemButton}
          onClick={() => findItems()}
          >Find item</button>
        
    </section>
  );
}

export default SidebarShop;
