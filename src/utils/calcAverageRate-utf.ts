import { RatingI } from "../model/stateModel/ratingI";

export const calcAverageRate = (usersRate: RatingI[]) => {
    let sumOfAllRate: number = 0;
    
    for(let i = 0; i < usersRate.length; i++) {
        sumOfAllRate += usersRate[i].rate;
    }

    if(sumOfAllRate === 0) {
        return 0;
    } else {
        return Math.round(sumOfAllRate / usersRate.length);
    }
}