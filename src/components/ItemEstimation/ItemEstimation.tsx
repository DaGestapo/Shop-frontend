import {FC, createRef, MouseEvent, useState, useEffect, ChangeEvent} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ItemEstimation.module.scss';

import { useAppDispatch } from '../../hooks/reduxTypedHools';

import { deleteItemByItemId } from '../../store/redusers/itemReduser';

import { addUserRating } from '../../http/ratingAPI';
import { addUserReview } from '../../http/reviewAPI';

import { starSolidIcon } from '../../utils/icons-utf';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {StarI } from '../../model/itemI';

interface ItemEstimationI {
    rate: StarI[];
    reviewNumber: number;
    itemId: string;
    showSumbit: boolean;
}

const ItemEstimation:FC<ItemEstimationI> = ({rate, reviewNumber, itemId, showSumbit}) => {
    const buttonRef = createRef<HTMLButtonElement>();
    const popupRef = createRef<HTMLElement>();
    const ratingStarsRef = createRef<HTMLElement>();
    const dispatch = useAppDispatch();

    const [reviewText, setReviewText] = useState<string>('');
    const [starsArray, setStarsArray] = useState<IconDefinition[]>([]);

    useEffect(() => {
        let tempStarsArray: IconDefinition[] = [];
        for(let i = 0; i < 5; i++) {
            tempStarsArray.push(starSolidIcon);
        }

        setStarsArray(tempStarsArray);
    }, []);

    const writeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    }

    const selectRating = (e: MouseEvent<HTMLElement>) => {
        if(!(e.target instanceof SVGPathElement)) return;
        const svg = e.target.closest('svg');
        if(!svg) return;

        const currentIndex = Number(svg.id)+1;

        addUserRating(currentIndex, itemId)
            .then(data => {
                console.log(data);
            });

        if(reviewText) {
            addUserReview(reviewText, itemId)
                .then(data => {
                    console.log(data);
                })
        }    
        setReviewText('');

        dispatch(deleteItemByItemId(itemId));
        ratingStarsRef.current?.classList.remove(module.open);
    }

    const hoverStar = (e: MouseEvent<HTMLElement>) => {
        if(!(e.target instanceof SVGPathElement)) return;

        const svg = e.target.closest('svg');
        if(!svg) return;

        const currentIndex = Number(svg.id);

        for(let i = 0; i < 5; i++) {
           const starEl = ratingStarsRef.current?.querySelector(`svg[id = '${i}']`);
           if(i <= currentIndex) {
                starEl?.classList.add(module.hoverStar);
           } else {
                starEl?.classList.remove(module.hoverStar);
           }
        }

    }

    const hidePopup = (e: MouseEvent<HTMLElement>) => {
        const target = e.target;

        if(target instanceof HTMLButtonElement) {
            ratingStarsRef.current?.classList.add(module.open);
        };

        if(target instanceof HTMLTextAreaElement) return;

        popupRef.current?.classList.remove(module.open);
    }

    const openPopup = () => {
        popupRef.current?.classList.add(module.open);

    }

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
        {showSumbit &&
            <button 
                className={module.openPopup}
                onClick={openPopup}
                >Submit a reaview</button>
        }

        <section 
            className={module.estimation__popup}
            onClick={hidePopup}
            ref={popupRef}
        >
            <article className={module.estimation__review}>
                <h3>Review</h3>
                <textarea 
                    onChange={writeReview}
                ></textarea>
            </article>
            <button 
                ref={buttonRef}
            >Submit review</button>
        </section>

        <section 
            className={module.estimation__stars}
            ref={ratingStarsRef}
            onPointerMove={hoverStar}
            onClick={selectRating}
            >
                <h2>Rate our product</h2>
                <div>
                    {starsArray.map((star, index) => 
                    <FontAwesomeIcon
                        id={index.toString()}
                        key={`starRev-${index}`}
                        icon={star}/>    
                    )}
                </div>
        </section>
    </div>
    
);
}

export default ItemEstimation;
