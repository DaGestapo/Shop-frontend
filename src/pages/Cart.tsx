import {FC, useEffect} from 'react';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import CartItemList from '../components/CartItemList/CartItemList';
import CartPayment from '../components/CartPayment/CartPayment';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useAppDispatch } from '../hooks/reduxTypedHools';
import { useError } from '../hooks/useClearError';

import { setInitialCartState } from '../store/redusers/cartReduser';

import cartApi from '../http/cartAPI';

interface CartI {
}

const Cart:FC<CartI> = () => {
  const links = useCalcRoute();
  const dispath = useAppDispatch();
 
  useEffect(() => {
    cartApi.getUserCart.bind(cartApi)()
      .then(data => {
        if(!(data instanceof Error)){
          dispath(setInitialCartState(data.cart_item));
        }
      })
  }, []);


  return (
    <main className='auth'>
      <AccomplishedRoute links={links}/>
      <CartItemList />
      <CartPayment />
    </main>
  );
}

export default Cart;
