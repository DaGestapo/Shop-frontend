import {FC, useState, useRef, ChangeEvent, useEffect} from 'react';
import module from './PopupCartOrder.module.scss';

import cartApi from '../../http/cartAPI';
import { useError } from '../../hooks/useError';

import { CartOrderInfoI } from '../../model/stateModel/cartI';

interface PopupCartOrderI {
    itemId: string;
    colors: string[];
    sizes: string[];
    show: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;

    top?: number;
    deleteItemFromList?: () => void;
}

const PopupCartOrder: FC<PopupCartOrderI> = ({
  itemId, 
  colors, 
  sizes, 
  show, 
  setIsShow, 
  deleteItemFromList,
  top
}) => {

    const [orderInformation, setOrderInformation] = useState<CartOrderInfoI>({
        color: colors[0],
        size: Number(sizes[0])
      });
    const popupInfo = useRef<HTMLDivElement>(null);
    const checkOnError = useError();

    useEffect(() => {
      if(!popupInfo.current) return;

      if(show) {
          popupInfo.current.classList.add(module.show);
          return;
      }
      popupInfo.current.classList.remove(module.show);
    }, [show]);


    const addItemToCart = () => {
        setIsShow(!show);
        checkOnError(cartApi.addItemToUserCart.bind(cartApi)({
          itemId: itemId,
          quantity: 1,
          color: orderInformation.color,
          size: orderInformation.size,
        }))
        
        if(deleteItemFromList) {
          deleteItemFromList();
        }
        popupInfo.current?.classList.remove(module.show);
        
    }
    const selectColor = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;

    if(!(target instanceof HTMLSelectElement)) return;

    setOrderInformation({...orderInformation, color: target.value})
    }
    const selectSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;

    if(!(target instanceof HTMLSelectElement)) return;

    setOrderInformation({...orderInformation, size: Number(target.value)})
    }
    return (
        <div 
          ref={popupInfo} 
          className={`${module.popupInfo}`} 
          style={{top: `${top}px`}}
          >
              <select 
                name='colors'
                onChange={selectColor}
                >
                {colors.map(color => 
                  <option key={color} value={color}>{color}</option>  
                )}
              </select>
              <select 
                name='sizes'
                onChange={selectSize}
                >
              {sizes.map(size => 
                  <option key={size} value={size}>{size}</option>  
              )}  
              </select>
              <button 
                onClick={addItemToCart}
              >Add Item</button>
          </div>
    )
}

export default PopupCartOrder;