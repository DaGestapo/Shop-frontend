import {FC} from 'react';
import module from './news.module.scss';

import NewsArticle from '../NewsArticle/NewsArticle';
import Loader from '../Loader/Loader';

import { useGetNewsQuery } from '../../store/redusers/newsReduser';

interface NewsPropsI {
}

const News:FC<NewsPropsI> = () => {
    const {data, error, isLoading} = useGetNewsQuery(3);


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
            <section className={module.news}>
                <h2>LATEST NEWS</h2>
                <div className={module.list}>
                    {data?.newsArticle.map(article => 
                        <NewsArticle 
                            key={article.id}
                            id={article.id}
                            img={article.img}
                            title={article.title}
                            description={article.description}
                            date={article.createdDate.split('T')[0]}
                        />
                    )}
                </div>
            </section>
          );
      }
}

export default News;
