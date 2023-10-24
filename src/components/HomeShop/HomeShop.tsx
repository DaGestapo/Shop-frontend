import {FC, useEffect} from 'react';
import module from './HomeShop.module.scss';

import ShopItem from '../ShopItem/ShopItem';
import ShopItemFilter from '../ShopItemFilter/ShopItemFilter';

import { usePagination } from '../../hooks/usePagination';
import {useGetItemByCallback } from '../../hooks/useGetItemByCallback';
import { useLoader } from '../../hooks/useLoader';

export interface HomeShopPropsI {
}

export interface PaginationI {
  page: number;
  type: number;
  listener: boolean;
}

const HomeShop:FC<HomeShopPropsI> = () => {
  const loader = useLoader(8);
  const [items, typeId, setTypeId] = useGetItemByCallback(loader());
  const [
    paginationOptions, 
    setPaginationOptions, 
    loadNewPage
  ] = usePagination(items, typeId);

  useEffect(() => {
    setTypeId(0);
  }, []);
   
  return (
    <section className={module.homeShop}>
      <h2>BEST SELLER</h2>
      <ShopItemFilter 
        paginationOption={paginationOptions}
        setPaginationOption={setPaginationOptions} 
        setTypeId={setTypeId}
      />
      
      <div className={module.list}>
        {items?.map(item => 
            <ShopItem 
                key={item.id}
                item={item}
            />    
        )}
      </div>
      <button 
        onClick={() => loadNewPage(paginationOptions.page)}
        >LOAD MORE</button>
    </section>
  );
}

export default HomeShop;
