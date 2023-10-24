import { FC } from "react"
import module from './TdProduct.module.scss';

interface TdProductI {
    name: string;
    img: string;
}

const TdProduct: FC<TdProductI> = ({
    name,
    img
}) => {

    return (
        <td className={module.information}>
                <div className={module.information__img}>
                    <img src={process.env.REACT_APP_API_URL + img} alt="img" />
                </div>
                {name}
        </td>
    )
}

export default TdProduct;