import {FC, createRef, MouseEvent} from 'react';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import module from './ShopItem.module.scss';

import ItemPopupOnImg from '../ItemPopupOnImg/ItemPopupOnImg';
import ItemPrice from '../ItemPrice/ItemPrice';
import Rating from '../Rating/Rating';

import { useNavigate } from 'react-router-dom';
import { useCalcRate } from '../../hooks/useCalcRate';

import { starRegularIcon } from '../../utils/icons-utf';
import { starSolidIcon } from '../../utils/icons-utf';

import { ItemShopI } from '../../model/stateModel/itemI';

const ShopItem:FC<{item: ItemShopI}> = ({item}) => {
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
        className={module.shopItem}
        ref={divArticleRef}    
        onClick={moveToItemPage}
    >
        {item.hot && 
            <div className={module.hotSale}>HOT</div>
        }
        <ItemPopupOnImg 
            refArticle={divArticleRef}
            item={item}
        />
      
        <section className={module.info}>
            <ItemPrice 
                price={item.price}
                priceOff={item.priceOff}
                saleOff={item.saleOff}
            />
            <h4>{item.name}</h4>

            { rate && 
                <Rating rating={item.rating}/>
            }
        </section>
    </article>
  );
}

export default ShopItem;
