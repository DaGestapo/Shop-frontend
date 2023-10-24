import {FC} from 'react';
import module from './newsArticle.module.scss';

import { ArticleNewsI } from '../../model/stateModel/articleI';  

const NewsArticle:FC<ArticleNewsI> = ({
    id,
    title,
    img,
    description,
    date
}) => {
  return (
    <article className={module.article}>
      <img src={ process.env.REACT_APP_API_URL + img} alt="img" />
      
      <div className={module.info}>
        <p className={module.date}>{date}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default NewsArticle;
