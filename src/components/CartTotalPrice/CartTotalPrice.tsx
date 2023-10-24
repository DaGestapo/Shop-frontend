import {FC, useEffect, useMemo, useState} from 'react';
import module from './CartTotalPrice.module.scss';

import { useAppSelector } from '../../hooks/reduxTypedHools';

interface CartTotalPriceI {

}

const CartTotalPrice: FC<CartTotalPriceI> = () => {
    const totalItemsPrice = useAppSelector(state => state.cart.total);
    const [shippingPrice, setShippingPrice] = useState<number>(20);
    const totalPrice = useMemo(() => {
        return totalItemsPrice + shippingPrice;
    }, [totalItemsPrice, shippingPrice]);

    useEffect(() => {
        if(totalItemsPrice === 0) {
            setShippingPrice(0);
        } else {
            setShippingPrice(20);
        } 

    }, [totalItemsPrice]);

    return (
        <article className={module.check}>
                <ul>
                    <li className={module.check__item}>
                        <p>Subtotal <span className={module.right}>${totalItemsPrice}</span></p>
                    </li>
                    <li className={module.check__shipping}>
                    <p>Shipping fee <span className={module.right}>${shippingPrice}</span></p>
                    </li>
                    <li className={module.check__coupon}>
                    <p>Coupon <span className={module.right}>No</span></p>
                    </li>
                </ul>
                <h3>Total <span className={module.right}>${totalPrice}</span></h3>
                <button>Check out</button>
            </article>
    )
}

export default CartTotalPrice;