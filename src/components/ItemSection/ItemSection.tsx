import {FC, createRef, useState, PointerEvent, ChangeEvent} from 'react';
import module from './ItemSection.module.scss';

import CurrentItem from '../CurrentItem/CurrentItem';
import MobileCurrentItem from '../MobileItemSection/MobileCurrentItemI';
import BestSellsItem from '../BestSellsItem/BestSellsItem';
import ItemInformation from '../ItemInformation/ItemInformation';

import { useCalcRate } from '../../hooks/useCalcRate';

import { starRegularIcon, starSolidIcon } from '../../utils/icons-utf';

import { ItemFullI } from '../../model/stateModel/itemI';
import { CartInformationI } from '../../model/stateModel/cartI';

interface ItemSectionI {
  item: ItemFullI;
}


const ItemSection:FC<ItemSectionI> = ({item}) => {
  const rate = useCalcRate(item?.rating, starSolidIcon, starRegularIcon);
  const [cartInformation, setCartInformation] = useState<CartInformationI>({
    countedItem: 1,
    size: Number(item.item_info.sizes[0]),
    color: item.item_info.colors[0]
  });

  return (
    <section className={module.itemSection}>
        <CurrentItem 
          item={item} 
          starRate={rate ? rate : []}
          cartInformation={cartInformation}
          setCartInformation={setCartInformation}
          />
        <MobileCurrentItem 
          item={item} 
          starRate={rate ? rate : []}
          cartInformation={cartInformation}
          setCartInformation={setCartInformation}
          />
        <BestSellsItem />
        <ItemInformation 
          itemId={item.id}
          description={item.item_info.description}
          reviews={item.review}
        />
    </section>
  );



}

export default ItemSection;
