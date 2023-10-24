import {FC, createRef, useState, PointerEvent, ChangeEvent} from 'react';
import module from './ItemSection.module.scss';

import ItemEstimation from '../ItemHeader/ItemEstimation';
import ItemPrice from '../ItemPrice/ItemPrice';
import ShareButtonUI from '../../UI/ShareButtonUI/ShareButtonUI';
import ItemInformation from '../ItemInformation/ItemInformation';
import BestSellsItem from '../BestSellsItem/BestSellsItem';

import { useCalcRate } from '../../hooks/useCalcRate';

import { addCartItem } from '../../http/cartAPI';

import { starSolidIcon, starRegularIcon, cartIcon, heartIcon } from '../../utils/icons-utf';
import { twitterIcon, facebookIcon } from '../../utils/icons-utf';

import { ItemFullI } from '../../model/stateModel/itemI';
import { CartInformationI } from '../../model/stateModel/cartI';

interface ItemSectionI {
  item: ItemFullI;
}


const ItemSection:FC<ItemSectionI> = ({item}) => {
  const rate = useCalcRate(item?.rating, starSolidIcon, starRegularIcon);
  const [cartInformation, setCartInformation] = useState<CartInformationI>({
    countedItem: 1,
    size: Number(item.item_info.sizes[0]),
    color: item.item_info.colors[0]
  });
  const mainImageRef = createRef<HTMLImageElement>();


  const selectColor = (e: PointerEvent<HTMLLIElement>) => {
    const target = e.target;
    if(!(target instanceof HTMLLIElement)) return;

    const color = target.id;

    setCartInformation({...cartInformation, color});
  }

  const itemCounter = (e: PointerEvent<HTMLButtonElement>) => {
    const target = e.target;
    if(!(target instanceof HTMLButtonElement)) return;

    const targetId = target.id;
    
    switch (targetId) {
      case 'add':
        if(cartInformation.countedItem >= 10) return;
        setCartInformation({
          ...cartInformation, 
          countedItem: cartInformation.countedItem + 1
        })
        break;

      case 'subtract':
        if(cartInformation.countedItem <= 1) return;
        setCartInformation({
          ...cartInformation, 
          countedItem: cartInformation.countedItem - 1
        })
        break;
    
      default:
        break;
    }

  }

  const selectListener = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetSelect = e.currentTarget;
    const size = Number(targetSelect.value);
    
    setCartInformation({...cartInformation, size});
  }

  const changeMainImage = (e: PointerEvent<HTMLImageElement>) => {
    const target = e.target;
    if(!(target instanceof HTMLImageElement) || !mainImageRef.current) return;
    const src = target.src;
    mainImageRef.current.src = src;
  }

  const addItemToCart = (e: PointerEvent<HTMLDivElement>) => {
    addCartItem(item.id, cartInformation.color, Number(cartInformation.size), cartInformation.countedItem)
      .then(data => {
      
      })

      e.preventDefault();
  }


  return (
    <section className={module.itemSection}>
        <section className={module.currentItem}>
            <section className={module.imgs}>
              <div className={module.imgs__main}>
                <img
                   src={process.env.REACT_APP_API_URL + item.img} 
                   alt="img"
                   ref={mainImageRef}
                   />
              </div>
              <div className={module.imgs__list}>
                  {item.item_imgs.img.map(src => 
                    <img 
                      className={module.imgs__list__item}
                      src={process.env.REACT_APP_API_URL + src}
                      alt="img" 
                      onClick={changeMainImage}
                    />
                    )}
              </div>
            </section>
            <article className={module.information}>
              <h3>{item.name}</h3>
              {rate && 
                <ItemEstimation 
                  rate={rate}
                  reviewNumber={item.review.length}
                />
              }
              <ItemPrice 
                price={item.price}
                priceOff={item.priceOff}
                saleOff={item.saleOff}
              />
              <ul>
                <li>
                  Availablity: 
                  {item.available
                    ? <span className={`${module.right}`}> In Stock</span>
                    : <span className={`${module.right}`}> Not valid</span>
                  }
                </li>
                <li>
                  Category: 
                  <span className={`${module.right}`}> {item.type.name}</span>
                </li>
                <li>
                  Brand: 
                  <span className={`${module.right}`}> {item.brand.name}</span>
                </li>
                <li>Free shipping</li>
              </ul>
  
              <form>
                <div className={`${module.colors}`}> 
                <p>Select Color:  </p>
                  <ul className={`${module.right} ${module.colors__list}`}>
                    {item.item_info.colors.map(color => 
                      <li 
                        style={{backgroundColor: color}}
                        key={color} 
                        id={color}
                        onClick={selectColor}
                        />
                      )}
                  </ul>
                </div>
                <div className={`${module.sizes}`}>
                  <label>Size: </label>
                  <select 
                    className={`${module.right}`}
                    name="sizes" 
                    id="sizes"
                    onChange={selectListener}
                    >
                    {item.item_info.sizes.map(size => 
                      <option value={size}>{size}</option>
                    )}
                  </select>
                </div>
              </form>
              <form 
                onSubmit={(e) => {e.preventDefault()}}
                className={module.actionForm}
              >
               <div className={module.quantity}>
                  <button 
                    className={module.quantity__button}
                    id='subtract'
                    onClick={itemCounter}
                    >
                      -
                    </button>
                  <div 
                    className={`${module.quantity__display_right}`}
                    >
                      {cartInformation.countedItem}
                    </div>
                
                  <button 
                    className={module.quantity__button}
                    id='add'
                    onClick={itemCounter}
                    >
                      +
                    </button>
                </div>
                <div  onClick={addItemToCart} className={ `${module.right}, ${module.submitForm}`}>
                  <ShareButtonUI 
                    icon={cartIcon} 
                    backgroundColor={'#40BFFF'}
                    marginRight={'10px'}
                    >
                      Add To Cart
                    </ShareButtonUI>
                  <ShareButtonUI 
                    icon={heartIcon} 
                    backgroundColor={'#40BFFF'} 
                    padding={'10px'}
                    />
                </div>
              </form>
                <div className={module.socials}>
                  <ShareButtonUI
                    icon={facebookIcon}
                    backgroundColor={'#385C8E'}
                    marginRight={'10px'}
                  >
                      Share on Facebook
                  </ShareButtonUI>
                  <ShareButtonUI
                    icon={twitterIcon}
                    backgroundColor={'#03A9F4'}
                    marginRight={'10px'}
                  >
                      Share on Twitter
                  </ShareButtonUI>
                </div>
            </article>
        </section>
        <BestSellsItem />
        <ItemInformation 
          description={item.item_info.description}
          reviews={item.review}
        />
    </section>
  );



}

export default ItemSection;
