import {FC} from 'react';
import module from './FeaturedProduct.module.scss';

import FeaturedProductsItem from '../FeaturedProductItem/FeaturedProductItem'; 
import Loader from '../Loader/Loader';

import { useGetFeaturedItemsQuery } from '../../store/redusers/featuredItemReduser';


interface FeaturedProductPropsI {
}


const FeaturedProduct:FC<FeaturedProductPropsI> = () => {
    const {data, error, isLoading} = useGetFeaturedItemsQuery(3);

   
    if(isLoading) {
      return (
        <Loader />
      )
    } else if(error) {
      return (
        <div>Error occured</div>
      )
    } else {
      return (
        <section className={module.featuredProducts}>
            <h2>FEATURED PRODUCTS</h2>
            <div className={module.list}>
                {data?.articles.map(article => 
                <FeaturedProductsItem 
                    key={article.id}
                    id={article.id}
                    img={article.img}
                    title={article.title}
                    price={article.price}
                    priceOff={article.priceOff}
                />
                )}
            </div>
        </section>
      );
    }
}

export default FeaturedProduct;
