import {FC} from 'react';
import module from './ReviewList.module.scss';

import Review from '../Review/Review';

import { ReviewI } from '../../model/stateModel/reviewI';
import { RatingI } from '../../model/stateModel/ratingI';

interface ReviewListI {
    reviews : ReviewI[];
}

const ReviewList: FC<ReviewListI> = ({reviews}) => {


    if(reviews.length === 0) {
        return (
            <h2>No one writed a review</h2>
        )
    }
    else {
        return (
            <section>
                {reviews.map(review => 
                    <Review 
                        review={review}
                        />    
                )}
            </section>
        )
    }
}

export default ReviewList;