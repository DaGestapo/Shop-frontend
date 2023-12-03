import {FC, useState, useEffect} from 'react';
import { useCalcRoute } from '../hooks/useCalcRoute';
import AccomplishedRoute from '../components/AccomplishedRoute/AccomplishedRoute';
import WishTable from '../components/WishTable/WishTable';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHools';
import wishApi from '../http/wishAPI';
import { setInitialWishState } from '../store/redusers/wishReduser';


export interface WishListPropsI {
}

const WishList:FC<WishListPropsI> = () => {
  const links = useCalcRoute();
  const dispatch = useAppDispatch();
  const wishedItems = useAppSelector(state => state.wish.wishedItems);

  useEffect(() => {
    wishApi.getUserWhishedItems.bind(wishApi)()
      .then(data => {
        if(!(data instanceof Error)) {
          dispatch(setInitialWishState(data))
        }
      })
  }, []);


  return (
    <section>
      <AccomplishedRoute links={links}/>
      <WishTable wishedItems={wishedItems}/>
    </section>
  );
}

export default WishList;
