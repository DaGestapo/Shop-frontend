import {FC} from 'react';
import module from './TdPrice.module.scss';

interface TdPriceI {
    price: number;
}

const TdPrice: FC<TdPriceI> = ({price}) => {

    return  (
        <td className={module.price}>
            <p>
                ${price}
            </p>
        </td>
    )
}

export default TdPrice;