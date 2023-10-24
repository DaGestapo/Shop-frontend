import {FC} from 'react';
import module from './Advantages.module.scss';

import AdvantageArticle from '../AdvantageArticle/AdvantageArticle';
import Loader from '../Loader/Loader';

import { useGetAdvantagesQuery } from '../../store/redusers/advantageReduser';

interface AdvantagesPropsI {
}

const Advantages:FC<AdvantagesPropsI> = () => {
    const {data, error, isLoading} = useGetAdvantagesQuery(3);

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
        <section className={module.advantages}>
          {data?.articles.map(article => 
            <AdvantageArticle 
                key={article.id}
                id={article.id}
                img={article.img}
                title={article.title}
                description={article.description}
            />
            )}
        </section>
      ); 
    }
}

export default Advantages;
