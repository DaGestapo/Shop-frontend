import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import module from './HeaderNav.module.scss';

import logo from "../../styles/assets/Icon.png";

import { 
    CONTACT_ROUTE, 
    HOME_ROUTE, 
    SHOP_BAGS_ROUTE, 
    SHOP_BELT_ROUTE, 
    SHOP_ROUTE, 
    SHOP_SNEAKERS_ROUTE 
} from '../../utils/routeConst-utf';


interface HeaderNavPropsI {
}

const HeaderNav:FC<HeaderNavPropsI> = () => {

  return (
    <div className={module.shop}>
        <div className={module.logo}>
        <NavLink to={HOME_ROUTE}>
            <img src={logo} alt='logo'/>
            <h3>E-Comm</h3>
        </NavLink>    
        </div>

        <div className={module.navbar}>
        <NavLink to={HOME_ROUTE}>
            HOME
        </NavLink>
        <NavLink to={SHOP_BAGS_ROUTE}>
            BAGS
        </NavLink >
        <NavLink to={SHOP_SNEAKERS_ROUTE}>
            SNEAKERS
        </NavLink>
        <NavLink to={SHOP_BELT_ROUTE}>
            BELT
        </NavLink>
        <NavLink to={CONTACT_ROUTE}>
            CONTACT
        </NavLink>
        </div>
    </div>
  );
}

export default HeaderNav;
