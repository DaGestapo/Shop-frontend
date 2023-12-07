import {FC} from 'react';

import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import ItemSection from '../components/ItemSection/ItemSection';
import RelatedItem from '../components/RelatedItem/RelatedItem';
import Loader from '../components/Loader/Loader';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useGetItem } from '../hooks/useGetItem';

interface ItemPagePropsI {
}

const ItemPage:FC<ItemPagePropsI> = () => {
  const [item, isLoading] = useGetItem();
  const links = useCalcRoute(item?.id);

   if(item) {
    return (
      <section className='itemPage'>
        <AccomplishedRoute links={links}/>
        <ItemSection item={item}/>
        <RelatedItem 
          itemId={item.id}
          typeId={item.type.id}  
        />
      </section>
    );  
  } else if(isLoading) {
    return (
      <Loader />
    )
  } else {
    return (
      <div>
        <h1>Error occured</h1>
      </div>
      
    )
  }
}
export default ItemPage;
