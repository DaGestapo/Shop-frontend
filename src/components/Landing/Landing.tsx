import {FC} from 'react';
import module from './Landing.module.scss';

export interface LandingPropsI {
}

const Landing:FC<LandingPropsI> = () => {
  return (
    <article className={module.landing}>
      <h1>Super Flash Sale
        <br/>
        50% Off
        </h1>
    </article>
  );
}

export default Landing;
