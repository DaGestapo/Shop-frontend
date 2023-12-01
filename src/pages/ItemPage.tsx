import {FC} from 'react';

import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import ItemSection from '../components/ItemSection/ItemSection';
import RelatedItem from '../components/RelatedItem/RelatedItem';
import Loader from '../components/Loader/Loader';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useGetItem } from '../hooks/useGetItem';
import { useAppSelector } from '../hooks/reduxTypedHools';
import { useError } from '../hooks/useClearError';

interface ItemPagePropsI {
}

const ItemPage:FC<ItemPagePropsI> = () => {
  const [item, isLoading] = useGetItem();
  const links = useCalcRoute(item?.id);
  const [error, clearError] = useError(3000);

   if(item) {
    return (
      <section className='itemPage'>
        <AccomplishedRoute links={links}/>
        <ItemSection item={item}/>
        <RelatedItem 
          itemId={item.id}
          typeId={item.type.id}  
        />

      {error.isError &&
          <ErrorPopup closeError={clearError}>
            {error.message}
          </ErrorPopup>
      }
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
        {error.isError &&
          <ErrorPopup closeError={clearError}>
            {error.message}
          </ErrorPopup>
        }
      </div>
      
    )
  }
}
export default ItemPage;
