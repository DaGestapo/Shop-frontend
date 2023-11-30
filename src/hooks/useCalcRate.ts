import {useState, useEffect} from 'react';
import {StarI} from '../model/itemI';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {v4} from 'uuid';
import { calcAverageRate } from '../utils/calcAverageRate-utf';
import { RatingI } from '../model/stateModel/ratingI';


export const useCalcRate = (usersRate: RatingI[] | undefined, starS: IconDefinition, starR: IconDefinition) => {
    const [ratingObj, setRatingObj] = useState<StarI[]>();

    useEffect(() => {
        let rate;
        if(!usersRate) {
            rate = 0;
        } else {
            rate = calcAverageRate(usersRate);
        }

        let tempStars:StarI[] = [];
        for(let i=0; i<5; i++) {
            if(i < rate) {
                tempStars.push({
                    id: v4() + '_star',
                    star: starS
                }) 
            } else {
                tempStars.push({
                    id: v4() + '_star',
                    star: starR
                }) 
            }
        }
        setRatingObj(tempStars);
    }, [usersRate]);

    return ratingObj;

}