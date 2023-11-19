import { FC, PropsWithChildren } from "react";
import module from './MobileSliderHeader.module.scss';

interface MobileSliderHeaderI extends PropsWithChildren {
    showLink: boolean;
}

const MobileSliderHeader:FC<MobileSliderHeaderI> = ({children, showLink}) => {

    return (
        <section className={module.slider__header}>
                <h4>{children}</h4>
                {showLink && 
                    <p>Show More</p>
                }
        </section>
    )
}

export default MobileSliderHeader;