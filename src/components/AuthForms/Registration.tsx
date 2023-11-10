import {FC, useState, Dispatch, ChangeEvent, useEffect} from 'react';
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
