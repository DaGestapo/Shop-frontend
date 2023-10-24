import {FC} from 'react';
import module from './RelatedItem.module.scss';

import ShopItem from '../ShopItem/ShopItem';

import { useLoadItemsByLength } from '../../hooks/useLoadItemsBylenght';

interface RelatedItemI {
    itemId: string;
    typeId: number;
}

const RelatedItem: FC<RelatedItemI> = ({itemId, typeId}) => {
    const items = useLoadItemsByLength(4, typeId? typeId : 0, itemId);

    return (
        <section className={module.relatedItemList}>
             <h2>Related Item</h2>
             <ul>
            { items.map(item => 
                <ShopItem 
                    key={item.id + 'saleOff'}
                    item={item}
                />    
            )}
        </ul>
        </section>
    )
}

export default RelatedItem;