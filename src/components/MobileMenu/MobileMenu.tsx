import {FC, useEffect, createRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './MobileMenu.module.scss';

import { userIcon } from '../../utils/icons-utf';


import {NavLink} from 'react-router-dom';
import { CART_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../../utils/routeConst-utf';

interface MobileMenuI {

}

const MobileMenu: FC<MobileMenuI> = () => {
    const navRef = createRef<HTMLElement>();

    useEffect(() => {
        if(!navRef.current) return;
        const nav = navRef.current;

        const height = nav.getBoundingClientRect().height;
        const moveTo = window.pageYOffset + document.documentElement.clientHeight - height;

        nav.style.top = `${moveTo}px`;

        window.addEventListener('scroll', eventHandler);

        function eventHandler(e: Event) {
            const height = nav.getBoundingClientRect().height;
            const moveTo = window.pageYOffset + document.documentElement.clientHeight - height;

            nav.style.top = `${moveTo}px`;
           
        }

        return () => {
            window.removeEventListener('scroll', eventHandler);
        }
    }, []);

    return (
        <nav
            ref={navRef} 
            className={module.mobileMenu}
            >
            <NavLink to={HOME_ROUTE}>
            <FontAwesomeIcon icon={userIcon}/>
                Home
            </NavLink>
            <NavLink to={HOME_ROUTE}>
                <FontAwesomeIcon icon={userIcon}/>
                Explore
            </NavLink>
            <NavLink to={CART_ROUTE}>
                <FontAwesomeIcon icon={userIcon}/>
                Cart
            </NavLink>
            <NavLink to={SHOP_ROUTE}>
                <FontAwesomeIcon icon={userIcon}/>
                Offer
            </NavLink>
            <NavLink to={PROFILE_ROUTE}>
                <FontAwesomeIcon icon={userIcon}/>
                Account
            </NavLink>
        </nav>
    
    )
}

export default MobileMenu;