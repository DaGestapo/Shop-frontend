import {FC, useEffect} from 'react';
import module from './Forms.module.scss';
import { useAppDispatch } from '../../hooks/reduxTypedHools';
import { useInputData } from '../../hooks/useInputData';

import { setError } from '../../store/redusers/errorReduces'; 
import {setUser} from '../../store/redusers/userReduser';

import {envelopeIcon, lockIcon, userIcon} from '../../utils/icons-utf';
import FormInputUI from '../../UI/FormInputUI/FormInputUI';

import userApi from '../../http/userAPI';


import { UserI, RegistrationDataI } from '../../model/userI';


export interface RegistrationPropsI {
}


const Registration:FC<RegistrationPropsI> = () => {
  const dispatch = useAppDispatch();
  const [data, setData, changeFunc] = useInputData<RegistrationDataI>({
    username: '',
    email: '',
    password: '',
    passwordAgain: '',
    isEqualPassword: true,
  });

  useEffect(() => {
    if(data.password !== data.passwordAgain) {
      setData({...data, isEqualPassword: false})
    } else {
      setData({...data, isEqualPassword: true})
    }
  }, [data.password, data.passwordAgain]);

  
  async function registrate () {

    const responce: UserI | Error = await userApi.registration.bind(userApi)({
      username: data.username,
      email: data.email,
      password: data.password,
      passwordAgain: data.passwordAgain
    });

    if(!(responce instanceof Error)) {
      dispatch(setUser(responce))
    } else {
      dispatch(setError(responce.message))
    }

  }

  return (
    <form 
      className={module.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormInputUI 
        icon={userIcon}
        placeholder={'Your name...'}
        value={data.username}
        setValue={
          changeFunc('username')
        }
        />
      <FormInputUI 
        icon={envelopeIcon}
        placeholder={'Your Email...'}
        value={data.email}
        setValue={
          changeFunc('email')
        }
        />

      <FormInputUI 
        icon={lockIcon}
        placeholder={'Password...'}
        value={data.password}
        checkValue={data.isEqualPassword}
        setValue={
          changeFunc('password')
        }
        />

      <FormInputUI 
        icon={lockIcon}
        placeholder={'Password again...'}
        value={data.passwordAgain}
        checkValue={data.isEqualPassword}
        setValue={
          changeFunc('passwordAgain')
        }
      />
      
      <button onClick={() => registrate()}>Registrate</button>
    </form>
  );
}

export default Registration;
