import {FC} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './Review.module.scss';

import Rating from '../Rating/Rating';

import { userIcon } from '../../utils/icons-utf';

import { ReviewI } from '../../model/stateModel/reviewI';

interface ReviewPropsI {
    review: ReviewI;
}

const Review: FC<ReviewPropsI> = ({review}) => {

    return (
        <article className={module.reviewArticle}>
            <div className={module.reviewArticle__profile}>
                {review.user.img 
                    ? <div className={module.reviewArticle__profile_img}>
                        <img 
                            src={process.env.REACT_APP_API_URL + review.user.img}
                            alt="img"
                        />
                    </div>
                    : <div className={module.reviewArticle__profile_img}>
                        <FontAwesomeIcon icon={userIcon}/> 
                    </div> 
                }
                <section className={module.reviewArticle__profile_info}>
                    <p>{review.user.username}</p>
               
                    <Rating rating={[review.rating]}/>
                </section>
            </div>
            <div className={module.reviewArticle__review}>
                <p>{review.review}</p>
            </div>
            
        </article>
    )
}

export default Review;