import { $authHost } from './index';
import { CartResponseI } from '../model/serverModel/cartI';

export const addCartItem = async(itemId: string, color: string, size: number, quantity: number) => {
    try {
        const URLRequest = `api/cart`;

        const response = await $authHost.post(URLRequest, {
            itemId, color, size, quantity
        });  
        return response;
    } catch (error) {
        
    }
}

export const getUserCart = async(): Promise<CartResponseI> => {
   
    const URLRequest = `api/cart`;
    const response = await $authHost.get(URLRequest);
    return response.data;

}

export const changeQuantityOfItemByCartedItemId = async(cartedItemId: string, quantity: number): Promise<number> => {
    const URLRequest = `api/cart`;
    const response = await $authHost.put(URLRequest, {cartedItemId, quantity});

    return response.data;
}

export const deleteCartedItemByCartedItemId = async (cartedItemId: string): Promise<CartResponseI> => {
    const URLRequest = `api/cart`;
    const response = await $authHost.delete(URLRequest, {data: {cartedItemId}});

    return response.data;

}