import {FC, useState, useEffect} from 'react';
import module from './Header.module.scss';

import HeaderMain from '../HeaderMain/HeaderMain';
import HeaderNav from '../HeaderNav/HeaderNav';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

import { useLocation } from 'react-router-dom';

interface HeaderPropsI {

}

const Header:FC<HeaderPropsI> = () => {
  const {pathname} = useLocation();
  const [isHome, setIsHome] = useState<boolean>(false);

  useEffect(() => {
    if(pathname.split('/').length === 2) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [pathname]);

  return (
    <header className={module.header}>
      <HeaderMain/>
      <HeaderNav />
      {isHome && 
        <CategoryMenu />
      }
    </header>
  );
}

export default Header;
