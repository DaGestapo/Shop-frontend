import {FC} from 'react';
import module from './AdvantageArticle.module.scss';

import { ArticleAdvantageI } from '../../model/stateModel/articleI'; 

const AdvantageArticle:FC<ArticleAdvantageI> = ({
    title,
    img,
    description
}) => {
  return (
    <article className={module.article}>
      <img src={process.env.REACT_APP_API_URL + img} alt="img" />
      <h4>{title}</h4>
      <p>{description}</p>
    </article>
  );
}

export default AdvantageArticle;
