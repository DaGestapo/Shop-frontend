import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './HeaderMain.module.scss';

import DropDown from '../DropDown/DropDown';

import { useAppSelector } from '../../hooks/reduxTypedHools';

import {shevronIcon, userIcon, cartIcon, magGlassIcon} from '../../utils/icons-utf';

import { 
  ADMIN_ROUTE, 
  CART_ROUTE, 
  LOGIN_ROUTE, 
  PROFILE_ROUTE, 
  REGISTRATION_ROUTE, 
  WISH_LIST_ROUTE 
} from '../../utils/routeConst-utf';


interface HeaderMainPropsI {
}

const HeaderMain:FC<HeaderMainPropsI> = () => {
  const user = useAppSelector(state => state.user);
  
  return (
    <section className={module.main}>
      <DropDown icon={shevronIcon} defValue='EN'/>
      <DropDown icon={shevronIcon} defValue='USD'/>
          
        { user.auth
          ?(
            <div className={module.navbar}>
              {user.admin && 
                <NavLink to={ADMIN_ROUTE}>
                  Admin panel
                </NavLink>
              }
              <NavLink to={PROFILE_ROUTE}>
                <FontAwesomeIcon 
                  style={{marginRight: '1rem'}}
                  icon={userIcon}/>
                  My profile
              </NavLink>
              <NavLink to={WISH_LIST_ROUTE}>
                Whish List
              </NavLink>
              <NavLink to={CART_ROUTE}>
              <FontAwesomeIcon icon={cartIcon}/>
            </NavLink>
            <p className={module.curency}>
              {user.user?.balance || 0}$
            </p>
          </div>
          )
          : (
            <div className={module.navbar}>
              <NavLink to={LOGIN_ROUTE}>
                Login
              </NavLink>
              or
              <NavLink to={REGISTRATION_ROUTE}>
                Registration
              </NavLink>
            </div>
          )
          
        }

        <div className={module.search}>
          <FontAwesomeIcon icon={magGlassIcon}/>
          <input type="text" placeholder='Search Product'/>
        </div>
        
    </section>
  );
}

export default HeaderMain;
