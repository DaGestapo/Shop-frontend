import {FC} from 'react';
import module from './AuthLanding.module.scss';

import Login from '../AuthForms/Login';
import Registration from '../AuthForms/Registration';

import { useChangeTypeAuntification } from '../../hooks/useChangeTypeAuntification';

import logo from '../../styles/svg/Icon.svg';
import facebookImg from '../../styles/svg/Facebook.svg';
import googleImg from '../../styles/svg/Google.svg';


interface AuthLandingPropsI {
}

const AuthLanding:FC<AuthLandingPropsI> = () => {
    const [isRegistration, changeTypeAuth] = useChangeTypeAuntification();

    if(isRegistration) {
        return (
            <div className={module.auth}>
                <img src={logo} alt='logo'/>
                <h1>Welcome to E-Comm</h1>
                <p>Create an new account</p>
                <Registration />
                <div className={module.changeLanding}>
                    <p>
                        Have a account? 
                        <span onClick={changeTypeAuth}> Login</span>
                    </p>
                </div>
            </div>
          );
    } else {
        return (
            <div className={module.auth}>
                <img src={logo} alt='logo'/>
                <h1>Welcome to E-Comm</h1>

                <p>Sign in to continue</p>
                <Login/>
                <p>OR</p>
                <button className={module.social}>
                    <img src={googleImg} alt="google" />
                    Login with Google
                </button>
                <button className={module.social}>
                    <img src={facebookImg} alt="facebook" />
                    Login with Facebook
                </button>
                <div className={module.changeLanding}>
                    <p><span>Forgot Password</span></p>
                    <p>
                        Don’t have a account? 
                        <span onClick={changeTypeAuth}> Register</span>
                    </p>
                </div>
    
            </div>
          );
    }
}

export default AuthLanding;
