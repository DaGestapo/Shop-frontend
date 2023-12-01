import { FC } from "react";
import module from './BestSellsItem.module.scss';

import ItemPrice from "../ItemPrice/ItemPrice";
import Loader from "../Loader/Loader";

import { useCalcRate } from "../../hooks/useCalcRate";
import { useNavigate } from "react-router-dom";
import { useGetItem } from "../../hooks/useGetItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { starSolidIcon, starRegularIcon } from "../../utils/icons-utf";



interface BestSellsItemI {

}

const BestSellsItem:FC<BestSellsItemI> = () => {
    const [item, isLoading] = useGetItem(); // TEMPORARY SOLUTION FOT THAT SECTION
    const rate = useCalcRate(item?.rating, starSolidIcon, starRegularIcon);
    const navigate = useNavigate();

    if(item) {
        return (
            <section 
                className={module.bestSells}
                onClick={() => navigate(`/home/shop/${item.id}`)}
            >
                <h2>BEST SELLER</h2>
                <div className={module.itemInformation}>
                    <img src={process.env.REACT_APP_API_URL + item.img} alt="img" />
                    { rate && 
                    <div className={module.rating}>
                        {rate?.map(star => 
                            <FontAwesomeIcon key={star.id} icon={star.star}/>
                        )}
                    </div>
                    }  
                    <ItemPrice
                        price={item.price}
                        priceOff={item.priceOff}
                        saleOff={undefined}
                    />
                </div>

            </section>
        )
    } else if(isLoading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div>Error occured</div>
        )
        
    }
}

export default BestSellsItem;