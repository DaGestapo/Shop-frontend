import {FC} from 'react';

import AuthLanding from '../components/AuthLanding/AuthLanding';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';

import { useCalcRoute } from '../hooks/useCalcRoute';

interface AuthPropsI {
}

const Auth:FC<AuthPropsI> = () => {
  const links = useCalcRoute();

  return (
    <main className='auth'>
      <AccomplishedRoute links={links}/>
      <AuthLanding />

    
    </main>
  );
}

export default Auth;
