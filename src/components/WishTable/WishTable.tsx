import {FC} from 'react';
import module from './WishTable.module.scss';

import WhishedItem from '../WhishedItem/WhishedItem';
import EmptyTable from '../EmptyTable/EmptyTable';

import { WhishedI } from '../../model/stateModel/wishI';


interface WishTableI {
    wishedItems: WhishedI[];
}

const WishTable: FC<WishTableI> = ({wishedItems}) => {

    if(wishedItems.length !== 0) {
        return (
            <table className={module.wishTable}>
                <tr>
                     <th></th>
                     <th>PRODUCT</th>
                     <th>PRICE</th>
                     <th>ADD TO CART</th>
                 </tr>
    
                 {wishedItems.map(whishItem => 
                    <WhishedItem 
                        key={whishItem.id}
                        whishId={whishItem.id}
                        itemId={whishItem.item.id}
                        name={whishItem.item.name}
                        img={whishItem.item.img}
                        price={whishItem.item.price}
                        colors={whishItem.item.colors}
                        sizes={whishItem.item.sizes}
                    />
                )}
                
            </table>
        )
    } else {
        return (
            <EmptyTable>Your Wish List Is Empty</EmptyTable>
        )
    }
    
}

export default WishTable;