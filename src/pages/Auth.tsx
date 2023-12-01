import {FC} from 'react';

import AuthLanding from '../components/AuthLanding/AuthLanding';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useError } from '../hooks/useClearError';

interface AuthPropsI {
}

const Auth:FC<AuthPropsI> = () => {
  const links = useCalcRoute();
  const [error, clearError] = useError(3000);

  return (
    <main className='auth'>
      <AccomplishedRoute links={links}/>
      <AuthLanding />

      {error.isError &&
        <ErrorPopup closeError={clearError}>
          {error.message}
        </ErrorPopup>
      }
    </main>
  );
}

export default Auth;
