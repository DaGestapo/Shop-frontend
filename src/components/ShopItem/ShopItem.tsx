import {FC, createRef, MouseEvent, useEffect} from 'react';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import module from './ShopItem.module.scss';

import ItemPopupOnImg from '../ItemPopupOnImg/ItemPopupOnImg';
import ItemPrice from '../ItemPrice/ItemPrice';
import Rating from '../Rating/Rating';
import ShopItemTitle from '../ShopItemTitle/ShopItemTitle';

import { useNavigate } from 'react-router-dom';
import { useCalcRate } from '../../hooks/useCalcRate';

import { starRegularIcon } from '../../utils/icons-utf';
import { starSolidIcon } from '../../utils/icons-utf';

import { ItemShopI } from '../../model/stateModel/itemI';

interface ShopItemI {
    item: ItemShopI;
    position?: 'absolute' | 'relative';
}

const ShopItem:FC<ShopItemI> = ({item, position}) => {
    const divArticleRef = createRef<HTMLDivElement>();

    const navigate = useNavigate();
    const rate = useCalcRate(item.rating, starSolidIcon, starRegularIcon);

    const moveToItemPage = (e: MouseEvent<HTMLElement>) => {
        if(!(e.target instanceof HTMLElement)) return;
        const target = e.target;

        if(target instanceof HTMLButtonElement) return;
        if(target instanceof HTMLSelectElement) return;
        if(target instanceof HTMLOptionElement) return;

        navigate(`/home/shop/${item.id}`)
    }

  return (
    <article 
        style={{
            position: `${position? 'absolute': 'relative'}`
        }}
       
        className={module.shopItem}
        ref={divArticleRef}    
        onClick={moveToItemPage}
    >
        <ItemPopupOnImg 
            refArticle={divArticleRef}
            item={item}
        />
      
        <section className={module.info}>
           
            <ShopItemTitle>{item.name}</ShopItemTitle>
            <div className={module.ratingBlock}>
                { rate && 
                    <Rating rating={item.rating}/>
                }
            </div>

            <ItemPrice 
                price={item.price}
                priceOff={item.priceOff}
                saleOff={item.saleOff}
            />
    
    
        </section>
    </article>
  );
}

export default ShopItem;
