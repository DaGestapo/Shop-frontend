import {FC, useState, Dispatch, ChangeEvent} from 'react';
import module from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHools'; 
import {setUser} from '../../store/redusers/userReduser';

import {envelopeIcon, lockIcon, userIcon} from '../../utils/icons-utf';
import FormInputUI from '../../UI/FormInputUI/FormInputUI';
import { registration } from '../../http/userAPI';
import { UserI, RegistrationDataI } from '../../model/userI';
import { useInputData } from '../../hooks/useInputData';

export interface RegistrationPropsI {
}


const Registration:FC<RegistrationPropsI> = () => {
  const dispatch = useAppDispatch();
  const [data, changeFunc] = useInputData<RegistrationDataI>({
    username: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  async function registrate () {
    const responce: UserI = await registration(
      data.username,
      data.email,
      data.password
    )
    
    dispatch(setUser(responce))
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
        placeholder={'Password again...'}
        value={data.password}
        setValue={
          changeFunc('password')
        }
        />

      <FormInputUI 
        icon={lockIcon}
        placeholder={'Password again...'}
        value={data.passwordAgain}
        setValue={
          changeFunc('passwordAgain')
        }
      />
      
      <button onClick={() => registrate()}>Registrate</button>
    </form>
  );
}

export default Registration;
