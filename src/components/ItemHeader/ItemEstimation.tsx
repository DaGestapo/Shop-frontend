import {FC} from 'react';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import module from './ItemEstimation.module.scss';


import {StarI } from '../../model/itemI';

interface ItemEstimationI {
    rate: StarI[];
    reviewNumber: number;
}

const ItemEstimation:FC<ItemEstimationI> = ({rate, reviewNumber}) => {

  return (
    
    <div className={module.estimation}>
        { rate && 
            <div className={module.rating}>
                {rate?.map(star => 
                    <FontAwesomeIcon key={star.id} icon={star.star}/>
                )}
            </div>
        }
        <p>{reviewNumber} reviews</p>
        <p>Submit a reaview</p>
    </div>
    
);
}

export default ItemEstimation;
