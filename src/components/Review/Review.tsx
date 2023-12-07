import {FC, useState, createRef, ChangeEvent} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './Review.module.scss';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHools';

import Rating from '../Rating/Rating';

import reviewApi from '../../http/reviewAPI';
import { deleteItemByItemId } from '../../store/redusers/itemReduser';

import { userIcon } from '../../utils/icons-utf';

import { ReviewI } from '../../model/stateModel/reviewI';

interface ReviewPropsI {
    review: ReviewI;
    itemId: string;
}

const Review: FC<ReviewPropsI> = ({review, itemId}) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.user); 
    const [textReview, setTextReview] = useState<string>(review.review);
    const [isReviewEditorOpen, setIsReviewEditorOpen] = useState<boolean>(false);

    const paragraphRef = createRef<HTMLParagraphElement>();
    const reviewPopup = createRef<HTMLDivElement>();

    const openPopup = () => {
        if(!reviewPopup.current || !paragraphRef.current) return;

        reviewPopup.current.classList.toggle(module.open);
        paragraphRef.current.classList.toggle(module.close);
        setIsReviewEditorOpen(!isReviewEditorOpen);
    }

    const confirmChanges = () => {
        openPopup();

        reviewApi.changeUserReviewText.bind(reviewApi)({
            reviewId: review.id,
            reviewText: textReview
        })
            .then(data => {
                console.log(data);
            })
        
        dispatch(deleteItemByItemId(itemId));
    }

    const changeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextReview(e.target.value);
    }

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
                <p ref={paragraphRef}>{review.review}</p>
                {(currentUser && currentUser.user?.id === review.user.id) &&
                <div 
                    ref={reviewPopup}
                    className={module.reviewArticle__popup}>
                    <textarea
                        onChange={changeReview}
                        defaultValue={textReview}
                    />
                </div>
            }
            </div>
            {(currentUser && currentUser.user?.id === review.user.id) &&
                <div>
                    {isReviewEditorOpen 
                        ?   <div>
                                <button
                                    className={module.reviewArticle_changeReview}
                                    onClick={confirmChanges}
                                >Confirm Changes</button>
                                <button
                                    style={{marginLeft: `10px`}}
                                    className={module.reviewArticle_changeReview}
                                    onClick={openPopup}
                                >Close</button>
                            </div>
                        :   <div>
                                <button
                                    className={module.reviewArticle_changeReview}
                                    onClick={openPopup}
                                >Edit your review</button>
                            </div>
                    }
                </div>
                
            }

            
        </article>
    )
}

export default Review;