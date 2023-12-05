import {FC, createRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ItemPopupOnImg.module.scss';

import PopupCartOrder from '../PopupCartOrder/PopupCartOrder';

import { useShowCover } from '../../hooks/useShowCover';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHools';

import wishApi from '../../http/wishAPI';

import { useError } from '../../hooks/useError';
import { ItemWithInfoI } from '../../model/stateModel/itemI';

import { heartIcon, cartIcon } from '../../utils/icons-utf';

interface ItemPopupOnImgPropsI {
  item: ItemWithInfoI;
  refArticle: React.RefObject<HTMLDivElement>;
  isShowPopup: boolean;
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemPopupOnImg:FC<ItemPopupOnImgPropsI> = ({item, refArticle, isShowPopup, setIsShowPopup}) => {
  const divCoverRef = createRef<HTMLDivElement>();
  const imgRef = createRef<HTMLImageElement>();
  const checkOnError = useError();
  const userAuth = useAppSelector(state => state.user.auth);
  
  useShowCover(refArticle, divCoverRef, imgRef);
  

  const showCartOrder = () => {
    if(isShowPopup) {
      setIsShowPopup(false);
      return;
    }

    setIsShowPopup(true);
  }

  const addItemToWishList = () => {
    checkOnError( wishApi.addWishItem.bind(wishApi)(item.id));
  }

  return (
    <div className={module.swichBlock}>
        {item.hot && 
              <div className={module.hotSale}>HOT</div>
          }
        <img ref={imgRef} src={process.env.REACT_APP_API_URL + item.img} alt="img"/>
        {userAuth && 
          <div 
            className={module.cover}
            ref={divCoverRef}    
          >
            <button
              onClick={addItemToWishList}
            >
              <FontAwesomeIcon 
                icon={heartIcon} 
                />
            </button>
        
            <button
              className={module.cover_button}
              onClick={showCartOrder}
            >
              <FontAwesomeIcon 
                icon={cartIcon} 
              />
            </button>

           <PopupCartOrder 
            itemId={item.id}
            colors={item.item_info.colors}
            sizes={item.item_info.sizes}
            show={isShowPopup}
            setIsShow={setIsShowPopup}
           />
          </div>
        }
          
      </div>
  );
}

export default ItemPopupOnImg;
