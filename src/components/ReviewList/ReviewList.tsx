import {FC} from 'react';
import module from './ReviewList.module.scss';

import Review from '../Review/Review';

import { useAppSelector } from '../../hooks/reduxTypedHools';

import { ReviewI } from '../../model/stateModel/reviewI';

interface ReviewListI {
    reviews : ReviewI[];
    itemId: string;
    showOne: boolean;
}

const ReviewList: FC<ReviewListI> = ({reviews, itemId, showOne}) => {
    const currentUser = useAppSelector(state => state.user); 

    if(reviews.length === 0) {
        return (
            <h2>No one writed a review</h2>
        )
    }
    else {
        return (
            <section>
                {showOne && 
                    <Review 
                        itemId={itemId}
                        review={reviews[0]}
                    /> 
                }
                {reviews.map(review => 
                        !showOne 
                        ?  <Review 
                            key={review.id}
                            itemId={itemId}
                            review={review}
                        /> 
                        : null
                )}
            </section>
        )
    }
}

export default ReviewList;