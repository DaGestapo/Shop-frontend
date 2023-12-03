import { FC, useState} from "react";
import module from './WhishedItem.module.scss';

import TdProduct from "../TdProduct/TdProduct";
import TdDelete from "../TdDelete/TdDelete";
import TdPrice from "../TdPrice/TdPrice";
import PopupCartOrder from "../PopupCartOrder/PopupCartOrder";

import { useAppDispatch } from "../../hooks/reduxTypedHools";

import wishApi from "../../http/wishAPI";
import { setInitialWishState } from "../../store/redusers/wishReduser";


interface WhishedItemI {
    itemId: string;
    whishId: string;
    name: string;
    img: string;
    price: number;
    colors: string[];
    sizes: string[];
}

const WhishedItem: FC<WhishedItemI> = ({
    itemId,
    whishId,
    name,
    img,
    price,
    colors,
    sizes
}) => {
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const dispath = useAppDispatch();

    const showCartOrder = () => {

        if(isShowPopup) {
            setIsShowPopup(false);
            return;
        }
    
        setIsShowPopup(true);
      }

    const deleteWhishedItem = (whishId: string) => {

        return () => {
            wishApi.deleteWhishedItemByWhishedItemId.bind(wishApi)(whishId)
            .then(data => {
                if(!(data instanceof Error)) {
                    dispath(setInitialWishState(data));
                }
            })
        }
    }

    return (
        <tr className={module.whishItem}>
            <TdDelete 
                deleteFunck={deleteWhishedItem(whishId)}
            />
            <TdProduct 
                name={name}
                img={img}
            />
            <TdPrice price={price}/>
            <td className={module.tdOrder}>
                <button
                    className={module.tdOrder_button}
                    onClick={showCartOrder}
                >Add To Cart</button>
                <PopupCartOrder 
                    itemId={itemId}
                    colors={colors}
                    sizes={sizes}
                    show={isShowPopup}
                    top={0}
                    setIsShow={setIsShowPopup}
                    deleteItemFromList={deleteWhishedItem(whishId)}
                />
            </td>
        </tr>
    )
}

export default WhishedItem;