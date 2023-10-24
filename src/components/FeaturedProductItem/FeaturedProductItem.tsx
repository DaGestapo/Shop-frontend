import {FC} from 'react';
import module from './FeaturedProductItem.module.scss';

import { ArticleFeaturedProductsI } from '../../model/stateModel/articleI'; 


const FeaturedProductsItem:FC<ArticleFeaturedProductsI> = ({
    id,
    title,
    img,
    price,
    priceOff

}) => {


  return (
    <article className={module.article}>
      <img src={process.env.REACT_APP_API_URL + img} alt="img" />

      <div className={module.info}>
        <h4>{title}</h4>
        
        {priceOff
          ? (
            <p className={module.price}>
              <span className={module.price_red}>${priceOff}</span>
              <span className={module.price_gray}>${price}</span>
            </p>
          )
          : (
            <p className={module.price}>
              <span className={module.price_default}>${price}</span>
            </p>
          )
        }
      </div>
    </article>
  );
}

export default FeaturedProductsItem;
