import {FC} from 'react';
import module from './Advertisement.module.scss';

import img from '../../styles/svg/shoes-shoe-png-transparent-shoe-images-pluspng-17 1.svg';

interface AddPropsI {
}

const Advertisement:FC<AddPropsI> = () => {
  return (
    <article className={module.add}>
        <section className={module.info}>
            <h1>Adidas Men Running Sneakers</h1>
            <p>Performance and design. Taken right to the edge.</p>
            <button>
              SHOW MORE
              <hr />
            </button>
        </section>
    
        <img src={img} alt="img"/>
    </article>
  );
}

export default Advertisement;
