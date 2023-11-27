import {FC} from 'react';

import AuthLanding from '../components/AuthLanding/AuthLanding';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';

import { useAppSelector } from '../hooks/reduxTypedHools';
import { useCalcRoute } from '../hooks/useCalcRoute';

interface AuthPropsI {
}

const Auth:FC<AuthPropsI> = () => {
  const links = useCalcRoute();
  const error = useAppSelector(state => state.error);

  return (
    <main className='auth'>
      <AccomplishedRoute links={links}/>
      <AuthLanding />

      {error.isError &&
        <ErrorPopup>
          {error.message}
        </ErrorPopup>
      }
    </main>
  );
}

export default Auth;
