import {FC, useState, PointerEvent, createRef} from 'react';
import module from './ItemInformation.module.scss';

import ReviewList from '../ReviewList/ReviewList';

import { ReviewI } from '../../model/stateModel/reviewI';
import { RatingI } from '../../model/stateModel/ratingI';

enum display {
    'DESCRIPTION' = 'DESCRIPTION',
    'REVEWES' = 'REVEWES'
}

interface ItemInformationI {
    description: string;
    reviews: ReviewI[];
}

const ItemInformation: FC<ItemInformationI> = ({description, reviews}) => {
    const [displayedInformation, setDisplayedInformation] = useState<display>(
        display.DESCRIPTION
    );
    const buttonsListRef = createRef<HTMLDivElement>();

    const changeDisplayedInformation = (e: PointerEvent<HTMLButtonElement>) => {
        const target = e.target;

        if(!(target instanceof HTMLButtonElement)) return;

        const buttons = buttonsListRef.current?.querySelectorAll('button');
        buttons?.forEach(btn => {
            btn.classList.remove(module.selected);
        });
        if(target.id === display.DESCRIPTION) {
            setDisplayedInformation(display.DESCRIPTION);
        } else if(target.id === display.REVEWES) {
            setDisplayedInformation(display.REVEWES)
        }
        target.classList.add(module.selected);

    }

    return (
        <section className={module.itemInformation}>
            <div ref={buttonsListRef} className={module.buttonList}>
                <button 
                    id={display.DESCRIPTION}
                    onClick={changeDisplayedInformation}
                    className={module.selected}
                >Product  Information</button>
                <button 
                    id={display.REVEWES}
                    onClick={changeDisplayedInformation}
                >Reviews <span>{reviews.length}</span></button>
                <button onClick={changeDisplayedInformation}>Product  Information</button>
            </div>
            <div className={module.displayedInformation}>
                {displayedInformation === display.DESCRIPTION &&
                    <p>{description}</p>
                }

                {displayedInformation === display.REVEWES && 
                    <ReviewList reviews={reviews}/>
                }
            </div>
        </section>
    )

}

export default ItemInformation;