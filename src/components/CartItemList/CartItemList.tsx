import { FC } from "react"
import module from './CartItemList.module.scss';

import CartItem from "../CartItem/CartItem";
import EmptyTable from "../EmptyTable/EmptyTable";

import { useAppSelector } from "../../hooks/reduxTypedHools";


interface CartItemListI {

}

const CartItemList: FC<CartItemListI> = () => {
    const cart = useAppSelector(state => state.cart);

    if(cart.cartedItem.length !== 0) {
        return (
            <table className={module.cartTable}>
             <tr>
                 <th></th>
                 <th>PRODUCT</th>
                 <th>PRICE</th>
                 <th>QTY</th>
                 <th>UNIT PRICE</th>
             </tr>
             {cart.cartedItem?.map(cartItem => 
                     <CartItem 
                         key={cartItem.id}
                         id={cartItem.id}
                         img={cartItem.img} 
                         price={cartItem.price}
                         name={cartItem.name}
                         quantity={cartItem.quantity}
                         />
                 )
             }
            </table>
         )
    } else {
        return (
            <EmptyTable>Your Cart List Is Empty</EmptyTable>
        )
    }


    
}

export default CartItemList;
