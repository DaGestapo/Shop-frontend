import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './AddToCartButtonUI.module.scss';

import { cartIcon, heartIcon } from '../../utils/icons-utf';

interface AddToCartButtonUII {
  wishFunc: () => void;
}

const AddToCartButtonUI:FC<AddToCartButtonUII> = ({wishFunc}) => {
   
  

  return (
    <div className={module.buttons}>
        <button>
            <FontAwesomeIcon icon={cartIcon} /> 
            Add To Cart
        </button>
        <button onClick={wishFunc}>
            <FontAwesomeIcon icon={heartIcon} />
        </button>
    </div>
  );
}

export default AddToCartButtonUI;
