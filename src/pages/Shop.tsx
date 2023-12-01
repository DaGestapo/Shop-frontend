import {FC} from 'react';

import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import SidebarShop from '../components/SidebarShop/SidebarShop';
import ShopLanding from '../components/ShopLanding/ShopLanding';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useGetItemByCallback } from '../hooks/useGetItemByCallback';
import { useLoader } from '../hooks/useLoader';

export interface ShopPropsI {
}

const Shop:FC<ShopPropsI> = () => {
  const links = useCalcRoute();
  const  loader = useLoader(10);
  const [items, typeID, setTypeId] = useGetItemByCallback(loader());

  return (
    <main>
      <AccomplishedRoute links={links}/>
      <section className='shop'>
        <SidebarShop 
          typeId={typeID}
        />
        <ShopLanding 
          items={items}
          setTypeId={setTypeId}
        />
      </section>
    </main>
  );
}

export default Shop;
