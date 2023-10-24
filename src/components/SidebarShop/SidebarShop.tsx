import {FC, useRef} from 'react';
import module from './SidebarShop.module.scss';

import SideBarOption from '../SideBarOption/SideBarOption';
import ShopFilterSlider from '../ShopFilterSlider/ShopFilterSlider';

import { useSideBarOptions } from '../../hooks/useSideBarOptions';


export interface SidebarShopPropsI {
  typeId: number
}

const SidebarShop:FC<SidebarShopPropsI> = ({
  typeId
}) => {
  const brandOptions = useSideBarOptions('Brands');
  const sidebarRef = useRef<HTMLElement | null>(null);
  return (
    <section
      ref={sidebarRef}
      className={module.sidebar}
    >
        <SideBarOption 
          title={brandOptions.title} 
          options={brandOptions.options}
          typeId={typeId}
        />
        <ShopFilterSlider sidebar={sidebarRef.current}/>
        
    </section>
  );
}

export default SidebarShop;
