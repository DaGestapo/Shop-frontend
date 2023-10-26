import { $authHost } from './index';


export const addUserRating = async(rate: Number, itemId: string) => {
    try {
        const URLRequest = `api/rate`;
        const response = await $authHost.post(URLRequest, {
            itemId,
            rate
        });  
        return response.data;
    } catch (error) {
        
    }
}