import {FC} from 'react';
import module from './CartCouponForm.module.scss';

interface CartCouponFormI {}

const CartCouponForm: FC<CartCouponFormI> = () => {

    return (
        <form 
            className={module.couponForm}
            onSubmit={(e) => e.preventDefault()}
        >
                <div className={module.couponForm__input}>
                    <input type="text" placeholder='Voucher code'/>
                    <button>Redeem</button>
                </div>
        </form>
    )
}

export default CartCouponForm;