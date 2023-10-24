import {FC, createRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ItemPopupOnImg.module.scss';

import PopupCartOrder from '../PopupCartOrder/PopupCartOrder';

import { useShowCover } from '../../hooks/useShowCover';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHools';

import { addWhishItem } from '../../http/wishAPI';

import { setInitialWishState } from '../../store/redusers/wishReduser';
import { ItemWithInfoI } from '../../model/stateModel/itemI';

import { heartIcon, cartIcon } from '../../utils/icons-utf';

interface ItemPopupOnImgPropsI {
  item: ItemWithInfoI;
  refArticle: React.RefObject<HTMLDivElement>;
}

const ItemPopupOnImg:FC<ItemPopupOnImgPropsI> = ({item, refArticle}) => {
  const divCoverRef = createRef<HTMLDivElement>();
  const userAuth = useAppSelector(state => state.user.auth);
  const dispatch = useAppDispatch();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  
  useShowCover(refArticle, divCoverRef);
  

  const showCartOrder = () => {
    if(isShowPopup) {
      setIsShowPopup(false);
      return;
    }

    setIsShowPopup(true);
  }

  const addItemToWishList = () => {
    addWhishItem(item.id)
      .then(data => {
        console.log(data);
        //dispatch(setInitialWishState(data));
      })
  }

  return (
    <div className={module.swichBlock}>
        <img src={process.env.REACT_APP_API_URL + item.img} alt="img"/>
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
