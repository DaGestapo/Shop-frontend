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
  const [item, isLoading, error] = useGetItem();
  const links = useCalcRoute(item?.id);
  console.log(item);
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
      <div>Error occured</div>
    )
  }
}
export default ItemPage;
