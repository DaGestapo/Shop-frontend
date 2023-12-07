import { useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './hooks/reduxTypedHools';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './styles/app.scss';
import userApi from './http/userAPI';
import { setUser, setUserBalance } from './store/redusers/userReduser';
import {useServerMessage} from './hooks/useServerMessage';

import { publicRoutes, authRoutes, adminRoutes, nonAuthRoutes } from './router/router';

import Header from './components/Header/Header';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import MobileSearch from './components/MobileSearch/MobileSearch';
import MessagePopup from './components/ErrorPopup/MessagePopup';

import { resizeMobileList } from './utils/resizeMObileLists';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [messageState, clearError] = useServerMessage(3000);
  

  useEffect(() => {
    checkToken();

    async function checkToken() {
      const user = await userApi.check.bind(userApi)();
      if(!(user instanceof Error)) {
        dispatch( setUser(user) );
        const balance = await userApi.getUserBalance.bind(userApi)(user.id);

        if(!(balance instanceof Error)) {
          dispatch(setUserBalance(balance));
        }
      }
    }

  }, []);

  useEffect(() => {
    const mobileLists: NodeListOf<HTMLElement> = document.documentElement.querySelectorAll('.mobileList');
  
    if(!mobileLists) return;


    window.onresize = (e) => {
      for(let i = 0; i < mobileLists.length; i++) {
        resizeMobileList(mobileLists[i])
      }
    }

  }, []);

  return (
      <div className="app">
        <BrowserRouter>
        <MobileSearch />
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
            {messageState.message &&
                <MessagePopup isError={messageState.isError} closePopup={clearError}>
                  {messageState.message}
                </MessagePopup>
            }
        </BrowserRouter>
      </div>
  );
}

export default App;
