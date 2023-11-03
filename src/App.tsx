import {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './hooks/reduxTypedHools';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import './styles/app.scss';
import { check, getBalance } from './http/userAPI';
import { setUser, setUserBalance } from './store/redusers/userReduser';
import { useLoader } from './hooks/useLoader';

import { publicRoutes, authRoutes, adminRoutes, nonAuthRoutes } from './router/router';

import Header from './components/Header/Header';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    checkToken();

    async function checkToken() {
      const data = await check();
      if(data) {
        dispatch( setUser(data) );
        const {balance} = await getBalance(data.id);
        dispatch(setUserBalance(balance));
      }
    }

  }, []);

  return (
      <div className="app">
        <BrowserRouter>
          <Header/>
          <Routes>
            {publicRoutes.map(route => 
              <Route 
                key={route.path} 
                path={route.path} 
                Component={route.component} 
                />
            )}


            {user.auth
            ? (
              authRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.component} />
                )
            )
            : (
              nonAuthRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.component} />
                )
            )}


            {user.admin &&
              adminRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.component} />
                )
            }

            <Route path='*' Component={Home}/>

          </Routes>
          <MobileMenu />
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
