import {FC} from 'react';
import module from './Forms.module.scss';

import FormInputUI from '../../UI/FormInputUI/FormInputUI';

import { useAppDispatch } from '../../hooks/reduxTypedHools';
import { useInputData } from '../../hooks/useInputData'; 

import { setUser } from '../../store/redusers/userReduser';

import userApi from '../../http/userAPI';

import { LoginDataI } from '../../model/userI';
import { UserI } from '../../model/userI';

import {envelopeIcon, lockIcon} from '../../utils/icons-utf';
import { setMessageError } from '../../store/redusers/messageReduces';


interface LoginPropsI {
}


const Login:FC<LoginPropsI> = () => {
  const dispatch = useAppDispatch();
  const [data, setData, changeFunc] = useInputData<LoginDataI>({
    email: '',
    password: ''
  })

  async function logIn() {
    const responce: UserI | Error = await userApi.login.bind(userApi)(
      data.email,
      data.password
    )
    if(!(responce instanceof Error)) {
      dispatch(setUser(responce));
    } else {
      dispatch(setMessageError(responce.message))
    }
  }

  return (
    <form 
      className={module.form}
      onSubmit={(e) => e.preventDefault()} 
    >
      <FormInputUI 
        icon={envelopeIcon}
        placeholder={'Your email...'}
        value={data.email}
        setValue={
          changeFunc('email')
        }
        />
      <FormInputUI 
        icon={lockIcon}
        placeholder={'Your password...'}
        value={data.password}
        setValue={
          changeFunc('password')
        }

        />
      
      <button onClick={() => logIn()}>Sign in</button>
    </form>
  );
}

export default Login;
