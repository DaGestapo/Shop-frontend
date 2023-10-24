import {FC} from 'react';
import module from './ItemPrice.module.scss';

import { ItemPriceI } from '../../model/stateModel/itemI';

const ItemPrice:FC<ItemPriceI> = ({
    priceOff, 
    price, 
    saleOff
}) => {


    if(priceOff && saleOff) {
        return (
            <p className={module.price}>
                <span className={module.price_blue}>${priceOff}</span>
                <span className={module.price_gray}>${price}</span>
                <span className={module.price_red}>{saleOff} %Off</span>
            </p>
        )
    } else {
        return (
            <p className={module.price}>
                <span className={module.price_default}>${price}</span>
            </p>
        )
    }
  
}

export default ItemPrice;
