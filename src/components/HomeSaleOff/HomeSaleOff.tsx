import {FC} from 'react';
import module from './HomeSaleOff.module.scss';

import ShopItem from '../ShopItem/ShopItem';

import { useLoadItemsByLength } from '../../hooks/useLoadItemsBylenght';
import { useLoader } from '../../hooks/useLoader';



interface HomeSaleOffPropsI {
}

const HomeSaleOff: FC<HomeSaleOffPropsI> = () => {
    const items = useLoadItemsByLength(3, 0);
    const loader = useLoader(8);
    
    if(items.length < 3) {
        loader()(0);
    }

    return (
        <section className={module.saleOff}>
            { items.map(item => 
            <ShopItem 
                key={item.id + 'saleOff'}
                item={item}
            />    
        )}
        </section>
    )
}

export default HomeSaleOff