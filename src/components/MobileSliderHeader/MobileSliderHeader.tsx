import { FC, PropsWithChildren } from "react";
import module from './MobileSliderHeader.module.scss';

interface MobileSliderHeaderI extends PropsWithChildren {
    
}

const MobileSliderHeader:FC<MobileSliderHeaderI> = ({children}) => {

    return (
        <section className={module.slider__header}>
                <h4>{children}</h4>
                <p>Show More</p>
        </section>
    )
}

export default MobileSliderHeader;