import {FC} from 'react';
import module from './CartPayment.module.scss';

import CartCouponForm from '../CartCouponForm/CartCouponForm';
import CartTotalPrice from '../CartTotalPrice/CartTotalPrice';

interface CartPaymentI {

}

const CartPayment: FC<CartPaymentI> = () => {

    return (
        <section className={module.payment}>
            <CartCouponForm />
            <CartTotalPrice />
        </section>
    )
}


export default CartPayment;