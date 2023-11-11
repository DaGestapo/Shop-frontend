import {FC, useEffect, createRef, PointerEvent} from 'react';
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
  listLength: number;
}

const HomeShop:FC<HomeShopPropsI> = () => {
  const loader = useLoader(8);
  const buttonRef = createRef<HTMLButtonElement>();
  const [items, typeId, setTypeId] = useGetItemByCallback(loader());
  const [
    paginationOptions, 
    setPaginationOptions, 
    loadNewPage
  ] = usePagination(items, typeId);

  useEffect(() => {
    setTypeId(0);
  }, []);

  useEffect(() => {
    if(!buttonRef.current || !items) return;

    if(items.length % 8 === 0) {
      buttonRef.current.classList.remove(module.hide);
    } else {
      buttonRef.current.classList.add(module.hide);
    }
  }, [items])

   
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
        ref={buttonRef}
        onClick={() => loadNewPage(paginationOptions.page)}
        >LOAD MORE</button>
    </section>
  );
}

export default HomeShop;
