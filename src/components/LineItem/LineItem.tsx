import {FC, createRef} from 'react';
import module from './LineItem.module.scss'

import ItemPrice from '../ItemPrice/ItemPrice';
import ItemEstimation from '../ItemHeader/ItemEstimation';
import AddToCartButtonUI from '../../UI/AddToCartButtonUI/AddToCartButtonUI';

import { useNavigate } from 'react-router-dom';
import { useCalcRate } from '../../hooks/useCalcRate';

import { starRegularIcon } from '../../utils/icons-utf';
import { starSolidIcon } from '../../utils/icons-utf';

import { ItemShopI } from '../../model/stateModel/itemI';


const LineItem:FC<{item: ItemShopI}> = ({item}) => {
    const divArticleRef = createRef<HTMLDivElement>();
    const navigate = useNavigate();
    const rate = useCalcRate(item.rating, starSolidIcon, starRegularIcon);


  return (
    <article 
        className={module.shopItem}
        ref={divArticleRef}    
        onClick={() => navigate(`/home/shop/${item.id}`)}
    >
        <section className={module.imageBlock}>
            <img src={process.env.REACT_APP_API_URL + item.img} alt="img" />
        </section>
        <section className={module.item}>
            <h3>{item.name}</h3>
            <ItemEstimation 
                rate={rate? rate : []} 
                reviewNumber={item.review? item.review.length : 0}
            />
            <div className={module.item__info}>
                <ItemPrice 
                    price={item.price}
                    priceOff={item.priceOff}
                    saleOff={item.saleOff}
                />
                <p className={module.item__description}>
                    {item.item_info && 
                        item.item_info.description
                    }
                </p>
                <AddToCartButtonUI />
            
            </div>
        </section>

    </article>
  );
}

export default LineItem;
