import {FC, useEffect, useState, MouseEvent, createRef, Dispatch} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ShopLanding.module.scss';

import Advertisement from '../Advertisement/Advertisements';
import ShopItem from '../ShopItem/ShopItem';
import ShopLandingOption from '../ShopLandingOption/ShopLandingOption';
import LineItem from '../LineItem/LineItem';

import { useGetTypeIdByEndpoint } from '../../hooks/useGetTypeIdByEndpoint';

import { gridIcon, barsIcon } from '../../utils/icons-utf';

import { ItemShopI } from '../../model/stateModel/itemI';
import { SortOptionsI } from '../../model/sortI';
import { DisplayType } from '../../model/display';

interface ShopLandingPropsI {
  items: ItemShopI[] | null;
  setTypeId: Dispatch<React.SetStateAction<number>>
}


const ShopLanding:FC<ShopLandingPropsI> = ({
  items,
  setTypeId
}) => {
  const typeId = useGetTypeIdByEndpoint();
  const itemListRef = createRef<HTMLElement>();
  
  const [displayType, setDisplayType] = useState<DisplayType>({
    type: 'GRID'
  });
  const [brandOptions, setBrandOptions] = useState<SortOptionsI>({
    options: [
      'Name',
      'Brand',
      'Price',
      'Rating'
    ],
    selected: 'Sort By'
  });

  const [pageOptions, setPageOptions] = useState<SortOptionsI>({
    options: [
      '5',
      '10',
      '20',
      '25'
    ],
    selected: 'Show'
  });

 useEffect(() => {
  setTypeId(typeId);
  setPageOptions({
    options: [
      '5',
      '10',
      '20',
      '25'
    ],
    selected: 'Show'
  });

  setBrandOptions({
    options: [
      'Name',
      'Brand',
      'Price',
      'Rating'
    ],
    selected: 'Sort By'
  });

 }, [typeId]);


 const changeDisplayType = (e: MouseEvent<HTMLDivElement>) => {
  if(!(e.target instanceof SVGElement)) return;
  const target = e.target.closest('button');
  if(!target || !itemListRef.current) return;
  
  switch (target.id) {
    case 'LINE':
      itemListRef.current.classList.add(module.line);
      setDisplayType({type: target.id})
      break;

    case 'GRID':
      itemListRef.current.classList.remove(module.line);
      setDisplayType({type: target.id})
      break;

    default:
      break;
  }

 }

  return (
    <section className={module.landing}>
        <Advertisement />
        <section className={module.shopFilter}>
          <p>{items?.length} Items</p>
          <ShopLandingOption 
            options={brandOptions.options}
            selected={brandOptions.selected}
            setOptions={setBrandOptions}
          />

          <ShopLandingOption 
            options={pageOptions.options}
            selected={pageOptions.selected}
            setOptions={setPageOptions}
          />

          <div 
            className={module.displayType}
            onClick={changeDisplayType}
          >
            <button id='GRID'>
              <FontAwesomeIcon icon={gridIcon}/>
            </button>
            <button id='LINE'>
              <FontAwesomeIcon icon={barsIcon}/>
            </button>
          </div>
        </section>
        <section ref={itemListRef} className={module.itemsList}>
          {displayType.type === 'GRID' && 
             items?.map(item => 
              <ShopItem 
                  key={item.id}
                  item={item}
              />    
          )}

          {displayType.type === 'LINE' && 
            items?.map(item => 
              <LineItem 
                  key={item.id}
                  item={item}
              />    
          )}
          
        </section>
    </section>
  );
}

export default ShopLanding;
