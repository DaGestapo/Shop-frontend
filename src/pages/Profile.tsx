import {FC} from 'react';

import { useAppDispatch } from '../hooks/reduxTypedHools';
import { setUser } from '../store/redusers/userReduser';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE} from '../utils/routeConst-utf';

interface ProfilePropsI {
}

const Profile:FC<ProfilePropsI> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const exit = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate(HOME_ROUTE);
  }

  return (
    <section>
      profile
      <button onClick={() => exit()}>Exit</button>
    </section>
  );
}

export default Profile;
