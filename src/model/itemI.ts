import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SaleOffItemI {
    id: string;
    name: string;
    img: string;
    priceOff: number;
    price: number;
    saleOff: number;

}

export interface StarI {
    id: string;
    star: IconDefinition;
}
