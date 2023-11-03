import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './Rating.module.scss';


import { useCalcRate } from '../../hooks/useCalcRate';

import { starSolidIcon, starRegularIcon } from '../../utils/icons-utf';

import { RatingI } from '../../model/stateModel/ratingI';

interface RatingPropsI {
    rating: RatingI[];
    display?: string;
}

const Rating: FC<RatingPropsI> = ({rating, display}) => {
    const rate = useCalcRate(rating, starSolidIcon, starRegularIcon);

    return (
   
        <div className={module.rating}>
            {rate?.map(star => 
                <FontAwesomeIcon key={star.id} icon={star.star}/>
            )}
        </div>
        
    )
} 

export default Rating;