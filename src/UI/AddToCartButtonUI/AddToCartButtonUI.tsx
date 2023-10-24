import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './AddToCartButtonUI.module.scss';

import { cartIcon, heartIcon } from '../../utils/icons-utf';


const AddToCartButtonUI:FC = () => {
   
  return (
    <div className={module.buttons}>
        <button>
            <FontAwesomeIcon icon={cartIcon} /> 
            Add To Cart
        </button>
        <button>
            <FontAwesomeIcon icon={heartIcon} />
        </button>
    </div>
  );
}

export default AddToCartButtonUI;
