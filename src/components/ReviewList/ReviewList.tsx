import {FC} from 'react';
import module from './ReviewList.module.scss';

import Review from '../Review/Review';

import { ReviewI } from '../../model/stateModel/reviewI';

interface ReviewListI {
    reviews : ReviewI[];
    itemId: string;
}

const ReviewList: FC<ReviewListI> = ({reviews, itemId}) => {


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
                        key={review.id}
                        itemId={itemId}
                        review={review}
                        />    
                )}
            </section>
        )
    }
}

export default ReviewList;