import {FC} from 'react';
import module from './MobileAdd.module.scss';


interface MobileAddI {

}

const MobileAdd: FC<MobileAddI> = () => {

    return (
        <article className={module.mobileAdd}>
            <h3>Recomended Product</h3>
            <p>We recommend the best for you</p>
        </article>
    )
}

export default MobileAdd;