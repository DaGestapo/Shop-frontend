import {FC, createRef, useState, MouseEvent} from 'react';
import module from './LineItem.module.scss'

import ItemPrice from '../ItemPrice/ItemPrice';
import ItemEstimation from '../ItemEstimation/ItemEstimation';
import AddToCartButtonUI from '../../UI/AddToCartButtonUI/AddToCartButtonUI';
import PopupCartOrder from '../PopupCartOrder/PopupCartOrder';

import { useNavigate } from 'react-router-dom';
import { useCalcRate } from '../../hooks/useCalcRate';
import { addWhishItem } from '../../http/wishAPI';

import { starRegularIcon } from '../../utils/icons-utf';
import { starSolidIcon } from '../../utils/icons-utf';

import { ItemShopI } from '../../model/stateModel/itemI';


const LineItem:FC<{item: ItemShopI}> = ({item}) => {
    const divArticleRef = createRef<HTMLDivElement>();
    const navigate = useNavigate();
    const rate = useCalcRate(item.rating, starSolidIcon, starRegularIcon);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

    const addItemToWishList = () => {
        addWhishItem(item.id)
          .then(data => {
          })
      }

    const clickOnSectionHandler = (e: MouseEvent<HTMLElement>) => {
        if(!(e.target instanceof HTMLElement)) return;

        const tragetButton = e.target.closest('button');
        const targetSelect = e.target.closest('select');

        if(tragetButton) {
            setIsShowPopup(true);
            return;
        } else if(targetSelect) {
            return;
        }
        
        navigate(`/home/shop/${item.id}`)
    }
  return (
    <article 
        className={module.shopItem}
        ref={divArticleRef}    
        onClick={clickOnSectionHandler}
    >
        <section className={module.imageBlock}>
            <img src={process.env.REACT_APP_API_URL + item.img} alt="img" />
        </section>
        <section className={module.item}>
            <h3>{item.name}</h3>
            <ItemEstimation 
                showSumbit={false}
                itemId={item.id}
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
                <AddToCartButtonUI wishFunc={addItemToWishList}/>
            
            </div>
        </section>

        <PopupCartOrder 
            itemId={item.id}
            colors={item.item_info.colors}
            sizes={item.item_info.sizes}
            show={isShowPopup}
            setIsShow={setIsShowPopup}
        />

    </article>
  );
}

export default LineItem;
