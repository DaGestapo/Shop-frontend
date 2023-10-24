import {FC, createRef} from 'react';
import module from './ShopItemFilter.module.scss';

import { selectChild } from '../../utils/selectChildLi-utf';

import { 
  All_ITEMS_ID, 
  BAGS_ID, 
  BELT_ID, 
  SNEAKERS_ID, 
  SUNGLASSES_ID 
} from '../../utils/idConst-utf';

import { PaginationI } from '../HomeShop/HomeShop';

interface ShopItemFilterPropsI {
  paginationOption: PaginationI;
  setPaginationOption: React.Dispatch<React.SetStateAction<PaginationI>>;
  setTypeId: React.Dispatch<React.SetStateAction<number>>;
}

const ShopItemFilter:FC<ShopItemFilterPropsI> = ({
  setPaginationOption, 
  paginationOption,
  setTypeId
}) => {
  const divRef = createRef<HTMLDivElement>();

  const selectChildItem = selectChild(module);

  const changeItemList = async (typeId: number) => {
     setPaginationOption({
       ...paginationOption, 
       type: typeId,
       page: 1
     });
    setTypeId(typeId);
  }

  return (
    <div 
      className={module.controle}
      onClick={(e) => selectChildItem(e.target, divRef.current)}
      ref={divRef}
    >
        <button 
          className={module.selected}
          onClick={() => changeItemList(All_ITEMS_ID.id)}>
            All
        </button>
        <button onClick={() => changeItemList(BAGS_ID.id)}>Bags</button>
        <button onClick={() => changeItemList(SNEAKERS_ID.id)}>Sneakers</button>
        <button onClick={() => changeItemList(BELT_ID.id)}>Belt</button>
        <button onClick={() => changeItemList(SUNGLASSES_ID.id)}>Sunglasses</button>
      </div>
  );
}

export default ShopItemFilter;
