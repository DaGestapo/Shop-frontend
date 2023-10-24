import {RatingI} from './ratingI';
import {ReviewI} from './reviewI';
import {TypeI} from './typeI';
import {BrandI} from './brandI';


export interface ItemImgsI {
    id: string;
    img: string[];
}

export interface ItemInfoI {
    id: string;
    available: boolean;
    description: string;
}

export interface ItemInfoWithColorsSizes extends ItemInfoI{
    colors: string[] | []; // Actually array like "[blue, red, white]"
    sizes: string[] | []; // Actually array like "[41, 42, 42] OR ['XL', 'XXL']"
}

export interface ItemPriceI {
    price: number;
    priceOff?: number;
    saleOff?: number;
}


export interface ItemI extends ItemPriceI {
    id: string,
    name: string,
    available: boolean,
    img: string,
    hot: boolean,
} 

export interface ItemWithInfoI extends ItemI {
    item_info: ItemInfoWithColorsSizes
} 

export interface ItemShopI extends ItemI {
    item_info: ItemInfoWithColorsSizes;
    review: ReviewI[],
    rating: RatingI[],
}

export interface ItemFullI extends ItemI {
    review: ReviewI[],
    rating: RatingI[],
    brand: BrandI,
    type: TypeI,
    item_imgs: ItemImgsI,
    item_info: ItemInfoWithColorsSizes
}

// export interface ItemI {
//     id: string,
//     name: string,
//     price: number,
//     priceOff: number,
//     saleOff: number,
//     available: boolean,
//     review: ReviewI[],
//     img: string,
//     hot: boolean,
//     rating: RatingI[],
//     brand: BrandI,
//     type: TypeI,
//     item_imgs: ItemImgsI,
//     item_info: ItemInfoI
// }


export interface ItemsI {
    typeId: number;
    items: ItemFullI[];
}