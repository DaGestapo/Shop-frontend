import {FC, useEffect} from 'react';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import CartItemList from '../components/CartItemList/CartItemList';
import CartPayment from '../components/CartPayment/CartPayment';

import { useCalcRoute } from '../hooks/useCalcRoute';
import { useAppDispatch } from '../hooks/reduxTypedHools';

import { setInitialCartState } from '../store/redusers/cartReduser';

import { getUserCart } from '../http/cartAPI';

interface CartI {
}

const Cart:FC<CartI> = () => {
  const links = useCalcRoute();
  const dispath = useAppDispatch();
 
  useEffect(() => {
    getUserCart()
      .then(data => {
        dispath(setInitialCartState(data.cart_item));
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
