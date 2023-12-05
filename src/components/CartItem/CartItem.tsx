import { FC, useState, useEffect, useMemo } from "react";
import module from './CartItem.module.scss';

import SelectQuantityUI from "../../UI/SelectQuantityUI/SelectQuantityUI";
import TdProduct from "../TdProduct/TdProduct";
import TdDelete from "../TdDelete/TdDelete";
import TdPrice from "../TdPrice/TdPrice";

import { useError } from "../../hooks/useError";
import { useAppDispatch } from "../../hooks/reduxTypedHools";

import cartApi from "../../http/cartAPI";
import { changeQuantityByCartedItemId,setInitialCartState } from "../../store/redusers/cartReduser";

import {CartedItemI} from '../../model/stateModel/cartI';

const CartItem: FC<CartedItemI> = ({img, name, price, id, quantity}) => {
    const [multiplyerOfPrice, setMultiplyerOfPrice] = useState<number>(quantity);
    const dispath = useAppDispatch();
    const checkOnError = useError();
    const totalSingleItemPrice = useMemo(() => {
        return multiplyerOfPrice * price
    }, [multiplyerOfPrice]);

    useEffect(() => {
        cartApi.changeQuantityOfItemByCartedItemId.bind(cartApi)(id, multiplyerOfPrice)
            .then(data => {
                if(!(data instanceof Error)) {
                    dispath(changeQuantityByCartedItemId({id, quantity: data}));
                }
            })
    }, [multiplyerOfPrice]);

    const deleteCartedItem = (cartedItemId: string) => {

        return () => {
            checkOnError(cartApi.deleteCartedItemByCartedItemId.bind(cartApi)(cartedItemId))
                .then(data => {
                    dispath(setInitialCartState(data.cart_item))
                })
        }
    }

    return (
        <tr className={module.item}>
            <TdDelete 
                deleteFunck={deleteCartedItem(id)}
            />
            <TdProduct 
                name={name}
                img={img}
            />
            <TdPrice price={price}/>
            <td className={module.quantity}>
                <SelectQuantityUI 
                    state={multiplyerOfPrice}
                    changeValue={setMultiplyerOfPrice}
                />
            </td>
            <td className={module.totalItemPrice}>{totalSingleItemPrice}</td>
        </tr>
    )
}

export default CartItem;