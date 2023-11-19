import { FC, useState, useEffect, useRef,Dispatch, PointerEvent } from "react";
import module from './MobileCurrentItemI.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartInformationI } from "../../model/stateModel/cartI";

import ItemEstimation from "../ItemEstimation/ItemEstimation";
import ItemPrice from "../ItemPrice/ItemPrice";
import MobileItemSlider from "../ModileItemSlider/MobileItemSlider";
import ReviewList from "../ReviewList/ReviewList";

import { ItemSlider } from "../../service/itemSlider";

import { addCartItem } from "../../http/cartAPI";

import { ItemFullI } from "../../model/stateModel/itemI";
import { StarI } from "../../model/itemI";
import { TypeElementSlider } from "../../service/itemSlider";

interface MobileCurrentItemI {
    item: ItemFullI;
    starRate: StarI[];
    cartInformation: CartInformationI;
    setCartInformation: Dispatch<React.SetStateAction<CartInformationI>>;
}

const MobileCurrentItem:FC<MobileCurrentItemI> = ({
    item, 
    starRate, 
    cartInformation, 
    setCartInformation
}) => {
    const colorsList = useRef<HTMLElement>(null);
    const sizesList = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [showAllReviews, setShowAllReviews] = useState<boolean>(true);
    
    useEffect(() => {
        if(!colorsList.current || !sizesList.current) return;

        let sizesSlider: TypeElementSlider | null = new ItemSlider(
            sizesList.current, 
            70, 
            0, 
            50, 
            3
        );
        let colorsSlider: TypeElementSlider | null = new ItemSlider(
            colorsList.current, 
            70, 
            0, 
            50, 
            4
        );

        setShowAllReviews(true)

        return () => {
            sizesSlider = null;
            colorsSlider = null;
        }
   }, [item]);

   const selectMainImg = (e: PointerEvent<HTMLDivElement>) => {
        if(!(e.target instanceof HTMLButtonElement)) return;
        if(!imgRef.current) return;

        const buttonsList = e.target.closest('div');
        if(!buttonsList) return;
        const prevSelectedButton = buttonsList.querySelector(`.${module.select}`);
        if(!prevSelectedButton) return;

        prevSelectedButton.classList.remove(module.select);

        const src = e.target.id;
    
        imgRef.current.src = process.env.REACT_APP_API_URL + src;
        e.target.classList.add(module.select);
        
        
   }

   const setShowReviewValue = () => {
        setShowAllReviews(false);
   }

   const selectColor = (e: PointerEvent<HTMLElement>) => {
        if(!(e.target instanceof HTMLElement)) return;
        if(!e.target.id) return;

        setCartInformation({...cartInformation, color: e.target.id});
   }

   const selectSize = (e: PointerEvent<HTMLElement>) => {
        if(!(e.target instanceof HTMLElement)) return;
        if(!e.target.id) return;

        setCartInformation({...cartInformation, size: Number(e.target.id)});
    }

    const addToCartItem = () => {
        addCartItem(
            item.id, 
            cartInformation.color,
            cartInformation.size,
            cartInformation.countedItem
            )
    }

    return (
        <section className={module.mobileCurrentItem}>
            <section className={module.imgSection}>
                <div className={module.imgSection__mainImg}>
                    <img 
                        ref={imgRef} 
                        src={process.env.REACT_APP_API_URL + item.item_imgs.img[1]} 
                        alt="img"
                    />
                </div>
                <div 
                    className={module.imgSection__buttons}
                    onClick={selectMainImg}    
                >
                    {item.item_imgs.img.map((img, index) => 
                        index === 0 
                            ?  <button 
                                    className={module.select}
                                    key={img + 'btn'} 
                                    id={img}
                                />
                           :  <button 
                                key={img + 'btn'} 
                                id={img}
                            /> 
                        
                    )}
                </div> 
            </section>
            <article className={module.information}> 
                <h3>{item.name}</h3>
                {starRate && 
                    <ItemEstimation 
                    showSumbit={true}
                    itemId={item.id}
                    rate={starRate}
                    reviewNumber={item.review.length}
                    />
                }
                <ItemPrice 
                    price={item.price}
                    priceOff={item.priceOff}
                    saleOff={item.saleOff}
                />

                <section className={module.sizes}>
                    <h3>Select sizes</h3>
                    <section 
                        ref={sizesList} 
                        className={ module.list}
                        onClick={selectSize}
                        >
                        {item.item_info.sizes.map(size=> 
                            <article
                                key={size}
                                id={size}
                            >{size}</article>    
                        )}
                    </section>
                </section>

                
                <section className={module.colors}>
                    <h3>Select Color</h3> 
                    <section 
                        ref={colorsList} 
                        className={module.list}
                        onClick={selectColor}
                        >
                        {item.item_info.colors.map(color=> 
                            <article
                                key={color}
                                id={color} 
                                style={{backgroundColor: `${color}`}}
                                />    
                        )}
                    </section>
             
                </section>
             
                <section className={module.information}>
                    <h3>Description</h3>
                    <p>{item.item_info.description}</p>
                </section>

                <section className={module.review}>
                    <h3>Review Product</h3>
                    <button 
                        className={module.review_button}
                        onClick={setShowReviewValue}
                    >See More</button>
                    <div className={module.rating}>
                        {starRate.map(star => 
                            <FontAwesomeIcon key={star.id} icon={star.star}/>
                        )}
                    </div>
                    <ReviewList showOne={showAllReviews} reviews={item.review} itemId={item.id}/>
                    
                </section>

                <MobileItemSlider showLink={false}>You Might Also Like</MobileItemSlider>
                
                <button 
                    className={module.addToCart}
                    onClick={addToCartItem}
                    >
                    Add To Cart
                </button>
            </article>
        </section>
    )
}

export default MobileCurrentItem;