import {FC} from 'react';
import module from './Landing.module.scss';

import backgroundImg from '../../styles/assets/landingImg.png';

export interface LandingPropsI {
}

const Landing:FC<LandingPropsI> = () => {
  return (
    <article className={module.landing}>
      <img src={backgroundImg} alt="img" />
      <h1>Super Flash Sale
        <br/>
        50% Off
        </h1>
    </article>
  );
}

export default Landing;
