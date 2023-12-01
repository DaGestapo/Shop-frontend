import { CartResponseI } from '../model/serverModel/cartI';
import { Api } from './api';
import {CartItemResponseI, CartRequestParamsI} from '../model/serverModel/cartI';

class CartApi extends Api {

    constructor(adress: string) {
        super(adress);
    }

    public async addItemToUserCart(requestParams: CartRequestParamsI): Promise<CartItemResponseI[] | Error> {
        try {
            const {itemId, color, size, quantity} = requestParams;
            const URLRequest = this.adress;

            const {data} = await this.$authHost.post(URLRequest, {
                itemId, color, size, quantity
            });  
            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getUserCart(): Promise<CartResponseI | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.get(URLRequest);
            return data;
            
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async changeQuantityOfItemByCartedItemId(cartedItemId: string, quantity: number): Promise<number | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.put(URLRequest, {cartedItemId, quantity});

            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async deleteCartedItemByCartedItemId(cartedItemId: string): Promise<CartResponseI | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.delete(URLRequest, {data: {cartedItemId}});

            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }
}

export default new CartApi(`api/cart`);