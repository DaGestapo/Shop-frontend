import { $authHost } from './index';
import { WishedResponseI } from '../model/serverModel/wishI';


export const addWhishItem = async(itemId: string) => {
    try {
        const URLRequest = `api/wish`;
        const response = await $authHost.post(URLRequest, {
            itemId
        });  
        return response.data;
    } catch (error) {
        
    }
}

export const getUserWhishItems = async(): Promise<WishedResponseI[]> => {
    const URLRequest = `api/wish`;
    const response = await $authHost.get(URLRequest);

    return response.data;
}

export const deleteWhishedItemByWhishedItemId = async (wishItemId: string): Promise<WishedResponseI[]> => {
    const URLRequest = `api/wish`;
    const response = await $authHost.delete(URLRequest, {data: {wishItemId}});

    return response.data;

}